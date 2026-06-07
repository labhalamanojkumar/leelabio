import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        
        // Basic validation
        if (!data.firstName || !data.lastName || !data.email || !data.company || !data.message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Configure Nodemailer transporter
        // In a real production environment, use environment variables for these
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: Number(process.env.SMTP_PORT) || 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // If SMTP credentials aren't set, we'll log it and pretend it succeeded for development
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.warn('SMTP credentials missing. Logging submission instead:');
            console.log(data);
            
            // Artificial delay to simulate network request
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            return NextResponse.json(
                { message: 'Mock email sent successfully. (Configure SMTP in .env.local for real emails)' },
                { status: 200 }
            );
        }

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: 'info@leelabiologics.com', // Always send to this address
            replyTo: data.email,
            subject: `New RFP Submission from ${data.firstName} ${data.lastName} (${data.company})`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; border: 1px solid #eaeaea; border-radius: 8px;">
                    <h2 style="color: #0052cc; border-bottom: 2px solid #eaeaea; padding-bottom: 10px;">New Request for Proposal (RFP)</h2>
                    
                    <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
                    <p><strong>Company:</strong> ${data.company}</p>
                    <p><strong>Job Title:</strong> ${data.title || 'N/A'}</p>
                    <p><strong>Modality:</strong> ${data.modality || 'Not specified'}</p>
                    <p><strong>Timeline:</strong> ${data.timeline || 'Not specified'}</p>
                    
                    ${data.services && data.services.length > 0 ? `
                        <p><strong>Services Required:</strong></p>
                        <ul>
                            ${data.services.map((s: string) => `<li>${s}</li>`).join('')}
                        </ul>
                    ` : '<p><strong>Services Required:</strong> None specified</p>'}

                    <h3 style="color: #0052cc; margin-top: 20px;">Project Description:</h3>
                    <div style="background-color: #f8fafc; padding: 15px; border-radius: 4px; border-left: 4px solid #0052cc;">
                        <p style="white-space: pre-wrap; margin: 0;">${data.message}</p>
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: 'Email sent successfully' },
            { status: 200 }
        );

    } catch (error: any) {
        console.error('Failed to send email:', error);
        return NextResponse.json(
            { error: 'Failed to send message. Please try again later.' },
            { status: 500 }
        );
    }
}
