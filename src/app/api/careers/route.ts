import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import {
    createCareerApplication,
    getCareerJob,
    setCareerApplicationEmailStatus,
    type CareerApplication,
} from '@/lib/data-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CAREERS_EMAIL = 'careers@leelabiologics.com';
const MAX_RESUME_SIZE = 10 * 1024 * 1024;
const resumeTypes: Record<string, string> = {
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

function formText(formData: FormData, key: string, maxLength: number): string {
    const value = formData.get(key);
    return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function escapeHtml(value: string) {
    return value.replace(/[&<>"']/g, (character) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    })[character] as string);
}

async function markEmailFailed(id: string) {
    try {
        await setCareerApplicationEmailStatus(id, 'failed');
    } catch (error) {
        console.error('Failed to record career application email status:', error);
    }
}

export async function POST(request: Request) {
    let formData: FormData;
    try {
        formData = await request.formData();
    } catch {
        return NextResponse.json({ error: 'Invalid application submission.' }, { status: 400 });
    }

    const fullName = formText(formData, 'fullName', 160);
    const email = formText(formData, 'email', 254);
    const phone = formText(formData, 'phone', 50);
    const jobId = formText(formData, 'jobId', 180);
    const linkedIn = formText(formData, 'linkedIn', 500);
    const experience = formText(formData, 'experience', 160);
    const coverNote = formText(formData, 'coverNote', 5000);
    const resumeEntry = formData.get('resume');

    if (!fullName || !phone || !jobId || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ error: 'Enter your name, a valid email address, phone number, and position.' }, { status: 400 });
    }
    if (linkedIn) {
        try {
            const profileUrl = new URL(linkedIn);
            if (profileUrl.protocol !== 'https:' && profileUrl.protocol !== 'http:') throw new Error('Unsupported protocol.');
        } catch {
            return NextResponse.json({ error: 'Enter a valid LinkedIn or portfolio URL.' }, { status: 400 });
        }
    }
    if (!resumeEntry || typeof resumeEntry === 'string' || typeof resumeEntry.arrayBuffer !== 'function') {
        return NextResponse.json({ error: 'Please attach your resume in PDF, DOC, or DOCX format.' }, { status: 400 });
    }
    if (resumeEntry.size === 0 || resumeEntry.size > MAX_RESUME_SIZE) {
        return NextResponse.json({ error: 'Resume files must be between 1 byte and 10 MB.' }, { status: 400 });
    }

    const originalFileName = resumeEntry.name.split(/[\\/]/).pop() || 'resume';
    const resumeFileName = originalFileName.replace(/[\u0000-\u001f\u007f"]/g, '_').slice(0, 180);
    const extension = resumeFileName.toLowerCase().split('.').pop() || '';
    const resumeContentType = resumeTypes[extension];
    if (!resumeContentType) {
        return NextResponse.json({ error: 'Please attach your resume in PDF, DOC, or DOCX format.' }, { status: 400 });
    }

    let job;
    try {
        job = await getCareerJob(jobId);
    } catch (error) {
        console.error('Failed to load job for career application:', error);
        return NextResponse.json({ error: 'We could not verify this opening. Please try again later.' }, { status: 503 });
    }
    if (!job) {
        return NextResponse.json({ error: 'This opening is no longer available. Please refresh the careers page.' }, { status: 404 });
    }

    let resumeData: Buffer;
    try {
        resumeData = Buffer.from(await resumeEntry.arrayBuffer());
    } catch (error) {
        console.error('Failed to read uploaded career resume:', error);
        return NextResponse.json({ error: 'We could not read the attached resume. Please choose the file again.' }, { status: 400 });
    }

    const application: CareerApplication & { resumeData: Buffer } = {
        id: randomUUID(),
        createdAt: new Date().toISOString(),
        fullName,
        email,
        phone,
        jobTitle: job.title,
        jobId: job.id,
        reqId: job.reqId,
        linkedIn,
        experience,
        coverNote,
        resumeFileName,
        resumeContentType,
        resumeSize: resumeEntry.size,
        resumeData,
        status: 'new',
        emailStatus: 'pending',
    };

    try {
        await createCareerApplication(application);
    } catch (error) {
        console.error('Failed to save career application:', error);
        return NextResponse.json({ error: 'We could not save your application. Please try again later.' }, { status: 500 });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!host || !Number.isInteger(port) || !user || !pass) {
        await markEmailFailed(application.id);
        return NextResponse.json(
            {
                saved: true,
                emailSent: false,
                warning: 'Your application was saved, but the email notification is not configured. Our hiring team can see it in the admin dashboard.',
                applicationId: application.id,
            },
            { status: 202 }
        );
    }

    const detailRows: [string, string][] = [
        ['Applicant', fullName],
        ['Email', email],
        ['Phone', phone],
        ['Position', job.title],
        ['Requisition ID', job.reqId],
        ['Experience', experience || 'Not provided'],
        ['LinkedIn / portfolio', linkedIn || 'Not provided'],
        ['Resume', `${resumeFileName} (${(resumeEntry.size / 1024).toFixed(1)} KB)`],
        ['Note to hiring manager', coverNote || 'Not provided'],
    ];
    const textBody = detailRows.map(([label, value]) => `${label}: ${value}`).join('\n');
    const htmlBody = detailRows.map(([label, value]) =>
        `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value).replace(/\n/g, '<br>')}</p>`
    ).join('');

    try {
        const transporter = nodemailer.createTransport({
            host,
            port,
            secure: process.env.SMTP_SECURE === 'true' || port === 465,
            auth: { user, pass },
        });
        await transporter.sendMail({
            from: process.env.SMTP_FROM || user,
            to: CAREERS_EMAIL,
            replyTo: email,
            subject: `Job application: ${job.title.replace(/[\r\n]/g, ' ')} (${job.reqId.replace(/[\r\n]/g, ' ')})`,
            text: textBody,
            html: `<div style="font-family:Arial,sans-serif;max-width:640px;margin:auto"><h2>New career application</h2>${htmlBody}</div>`,
            attachments: [{
                filename: resumeFileName,
                content: application.resumeData,
                contentType: resumeContentType,
            }],
        });
    } catch (error) {
        console.error('Failed to deliver career application email:', error);
        await markEmailFailed(application.id);
        return NextResponse.json(
            {
                saved: true,
                emailSent: false,
                warning: 'Your application was saved, but the notification email could not be sent. Our hiring team can see it in the admin dashboard.',
                applicationId: application.id,
            },
            { status: 202 }
        );
    }

    try {
        await setCareerApplicationEmailStatus(application.id, 'sent');
    } catch (error) {
        console.error('Career application email was sent but its delivery status could not be saved:', error);
        return NextResponse.json(
            {
                saved: true,
                emailSent: true,
                warning: 'Your application email was sent, but its delivery status could not be updated.',
                applicationId: application.id,
            },
            { status: 202 }
        );
    }

    return NextResponse.json({
        saved: true,
        emailSent: true,
        message: `Your application was sent to ${CAREERS_EMAIL}.`,
        applicationId: application.id,
    });
}
