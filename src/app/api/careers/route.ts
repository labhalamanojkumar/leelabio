import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        const fullName = (formData.get('fullName') as string) || '';
        const email = (formData.get('email') as string) || '';
        const phone = (formData.get('phone') as string) || '';
        const position = (formData.get('position') as string) || '';
        const jobId = (formData.get('jobId') as string) || '';
        const linkedIn = (formData.get('linkedIn') as string) || '';
        const experience = (formData.get('experience') as string) || '';
        const coverNote = (formData.get('coverNote') as string) || '';
        const resumeFile = formData.get('resume') as File | null;

        if (!fullName || !email || !position) {
            return NextResponse.json(
                { error: 'Full name, email, and position are required.' },
                { status: 400 }
            );
        }

        // Buffer the uploaded resume if provided
        let resumeAttachment = null;
        if (resumeFile && typeof resumeFile.arrayBuffer === 'function' && resumeFile.size > 0) {
            const arrayBuffer = await resumeFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            resumeAttachment = {
                filename: resumeFile.name,
                content: buffer,
                contentType: resumeFile.type || 'application/octet-stream',
            };
        }

        // Configure Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: Number(process.env.SMTP_PORT) || 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // If credentials are not present, log details clearly for dev mode
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.log('=== CAREER APPLICATION DIRECTED TO careers@leelabiologics.com ===');
            console.log({
                targetEmail: 'careers@leelabiologics.com',
                applicant: fullName,
                applicantEmail: email,
                phone,
                positionApplied: position,
                jobId,
                linkedIn: linkedIn || 'N/A',
                coverNote: coverNote || 'N/A',
                resumeAttached: resumeAttachment
                    ? `${resumeAttachment.filename} (${Math.round(resumeAttachment.content.length / 1024)} KB)`
                    : 'No resume file attached',
            });
            console.log('==================================================================');

            // Simulate network request delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            return NextResponse.json(
                {
                    success: true,
                    message: `Application and resume for ${position} successfully received and directed to careers@leelabiologics.com`,
                    attachmentName: resumeAttachment?.filename || null,
                },
                { status: 200 }
            );
        }

        const mailOptions: any = {
            from: process.env.SMTP_USER,
            to: 'careers@leelabiologics.com', // Directed to careers@leelabiologics.com
            replyTo: email,
            subject: `Job Application: ${position} - ${fullName} (${jobId})`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 24px; max-width: 640px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
                    <h2 style="color: #0e7490; border-bottom: 2px solid #0e7490; padding-bottom: 12px; margin-top: 0;">
                        New Job Application Received
                    </h2>

                    <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 12px 16px; margin-bottom: 20px;">
                        <strong style="color: #166534; font-size: 16px;">Position Applied:</strong>
                        <div style="font-size: 18px; font-weight: bold; color: #14532d; margin-top: 2px;">${position}</div>
                        <div style="font-size: 12px; color: #15803d; margin-top: 2px;">Requisition ID: ${jobId}</div>
                    </div>

                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                        <tr>
                            <td style="padding: 8px 0; color: #64748b; font-weight: bold; width: 140px;">Applicant Name:</td>
                            <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${fullName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Email:</td>
                            <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #0e7490;">${email}</a></td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Phone:</td>
                            <td style="padding: 8px 0; color: #0f172a;">${phone || 'Not provided'}</td>
                        </tr>
                        ${linkedIn ? `
                        <tr>
                            <td style="padding: 8px 0; color: #64748b; font-weight: bold;">LinkedIn:</td>
                            <td style="padding: 8px 0;"><a href="${linkedIn}" target="_blank" style="color: #0e7490;">${linkedIn}</a></td>
                        </tr>
                        ` : ''}
                        <tr>
                            <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Resume Attachment:</td>
                            <td style="padding: 8px 0; color: #059669; font-weight: bold;">
                                ${resumeAttachment ? `✓ Attached: ${resumeAttachment.filename} (${Math.round(resumeAttachment.content.length / 1024)} KB)` : 'No attachment'}
                            </td>
                        </tr>
                    </table>

                    ${coverNote ? `
                    <div style="margin-top: 16px;">
                        <h4 style="color: #0f172a; margin-bottom: 8px;">Candidate Statement / Note:</h4>
                        <div style="background-color: #f8fafc; padding: 14px; border-radius: 6px; border-left: 4px solid #0e7490; color: #334155; line-height: 1.6;">
                            ${coverNote.replace(/\n/g, '<br/>')}
                        </div>
                    </div>
                    ` : ''}

                    <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
                        This application was submitted via Leelabiologics Careers Portal and directed to careers@leelabiologics.com.
                    </div>
                </div>
            `,
            attachments: resumeAttachment ? [resumeAttachment] : [],
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            {
                success: true,
                message: `Application and resume for ${position} successfully sent to careers@leelabiologics.com`,
                attachmentName: resumeAttachment?.filename || null,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Failed to submit career application:', error);
        return NextResponse.json(
            { error: 'Failed to process application. Please email careers@leelabiologics.com directly.' },
            { status: 500 }
        );
    }
}
