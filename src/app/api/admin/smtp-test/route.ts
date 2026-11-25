import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { isAdminRequest } from '@/lib/admin-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    if (!isAdminRequest(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    return NextResponse.json({
        configured: Boolean(process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS),
        host: process.env.SMTP_HOST || '',
        port: Number(process.env.SMTP_PORT || 587),
        recipient: process.env.CONTACT_EMAIL || 'info@leelabiologics.com',
        careersRecipient: 'careers@leelabiologics.com',
    });
}

export async function POST(request: NextRequest) {
    if (!isAdminRequest(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!host || !Number.isInteger(port) || !user || !pass) {
        return NextResponse.json({ error: 'Configure SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS first.' }, { status: 400 });
    }

    try {
        const transporter = nodemailer.createTransport({
            host,
            port,
            secure: process.env.SMTP_SECURE === 'true' || port === 465,
            auth: { user, pass },
        });
        await transporter.verify();
        return NextResponse.json({ verified: true, message: 'SMTP connection and authentication succeeded.' });
    } catch (error) {
        console.error('SMTP verification failed:', error);
        return NextResponse.json({ error: 'SMTP verification failed. Check the server logs and SMTP settings.' }, { status: 502 });
    }
}
