import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { randomUUID } from 'node:crypto';
import { createContactLead, setContactEmailStatus, type ContactLead } from '@/lib/data-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function text(value: unknown, maxLength: number) {
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

export async function POST(request: Request) {
    let data: Record<string, unknown>;
    try {
        data = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid form submission.' }, { status: 400 });
    }

    const firstName = text(data.firstName, 100);
    const lastName = text(data.lastName, 100);
    const email = text(data.email, 254);
    const company = text(data.company, 200);
    const message = text(data.message, 10000);
    const services = Array.isArray(data.services)
        ? data.services.filter((service): service is string => typeof service === 'string').slice(0, 30).map((service) => service.slice(0, 120))
        : [];

    if (!firstName || !lastName || !company || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ error: 'Please provide valid contact details and a message.' }, { status: 400 });
    }

    const lead: ContactLead = {
        id: randomUUID(),
        createdAt: new Date().toISOString(),
        firstName,
        lastName,
        email,
        phone: text(data.phone, 50),
        company,
        title: text(data.title, 120),
        modality: text(data.modality, 200),
        timeline: text(data.timeline, 120),
        message,
        services,
        status: 'new',
        emailStatus: 'pending',
    };

    try {
        await createContactLead(lead);
    } catch (error) {
        console.error('Failed to save contact inquiry:', error);
        return NextResponse.json({ error: 'We could not save your inquiry. Please try again later.' }, { status: 500 });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!host || !Number.isInteger(port) || !user || !pass) {
        await setContactEmailStatus(lead.id, 'failed');
        return NextResponse.json(
            {
                saved: true,
                emailSent: false,
                warning: 'Your inquiry was received and saved, but email notifications are not configured. Please do not resubmit; our team can see your inquiry.',
                leadId: lead.id,
            },
            { status: 202 }
        );
    }

    try {
        const transporter = nodemailer.createTransport({
            host,
            port,
            secure: process.env.SMTP_SECURE === 'true' || port === 465,
            auth: { user, pass },
        });
        const rows = [
            ['Name', `${firstName} ${lastName}`],
            ['Email', email],
            ['Phone', lead.phone || 'N/A'],
            ['Company', company],
            ['Job title', lead.title || 'N/A'],
            ['Modality', lead.modality || 'Not specified'],
            ['Timeline', lead.timeline || 'Not specified'],
            ['Services', services.join(', ') || 'None specified'],
            ['Message', message],
        ];
        const html = rows.map(([label, value]) =>
            `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value).replace(/\n/g, '<br>')}</p>`
        ).join('');

        await transporter.sendMail({
            from: process.env.SMTP_FROM || user,
            to: process.env.CONTACT_EMAIL || 'info@leelabiologics.com',
            replyTo: email,
            subject: `New RFP submission from ${firstName} ${lastName} (${company})`,
            text: rows.map(([label, value]) => `${label}: ${value}`).join('\n'),
            html: `<div style="font-family:Arial,sans-serif;max-width:640px;margin:auto"><h2>New RFP submission</h2>${html}</div>`,
        });

        await setContactEmailStatus(lead.id, 'sent');
        return NextResponse.json({ message: 'Your inquiry was received and emailed to our team.' });
    } catch (error) {
        console.error('Failed to deliver contact inquiry email:', error);
        await setContactEmailStatus(lead.id, 'failed');
        return NextResponse.json(
            {
                saved: true,
                emailSent: false,
                warning: 'Your inquiry is saved, but the notification email could not be sent. Please do not resubmit; our team can see your inquiry.',
                leadId: lead.id,
            },
            { status: 202 }
        );
    }
}
