import { NextRequest, NextResponse } from 'next/server';
import {
    ADMIN_SESSION_COOKIE,
    createAdminSession,
    credentialsMatch,
    getAdminSessionExpiry,
    isAdminConfigured,
    isAdminRequest,
} from '@/lib/admin-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const attempts = new Map<string, { count: number; resetAt: number }>();

export async function GET(request: NextRequest) {
    return NextResponse.json({ authenticated: isAdminRequest(request), configured: isAdminConfigured() });
}

export async function POST(request: NextRequest) {
    if (!isAdminConfigured()) {
        return NextResponse.json({ error: 'Admin credentials are not configured on this server.' }, { status: 503 });
    }

    const address = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
    let credentials: unknown;
    try {
        credentials = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid login request.' }, { status: 400 });
    }

    const body = credentials as { username?: unknown; password?: unknown };
    if (credentialsMatch(body.username, body.password)) {
        attempts.delete(address);
    } else {
        const now = Date.now();
        const attempt = attempts.get(address);
        if (attempt && attempt.resetAt > now && attempt.count >= 5) {
            return NextResponse.json({ error: 'Too many login attempts. Try again in 15 minutes.' }, { status: 429 });
        }
        const current = attempt && attempt.resetAt > now
            ? attempt
            : { count: 0, resetAt: now + 15 * 60 * 1000 };
        attempts.set(address, { ...current, count: current.count + 1 });
        return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
    }

    const session = createAdminSession();
    const response = NextResponse.json({ authenticated: true });
    response.cookies.set(ADMIN_SESSION_COOKIE, session.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: getAdminSessionExpiry(),
        expires: new Date(session.expiresAt * 1000),
    });
    return response;
}

export async function DELETE() {
    const response = NextResponse.json({ authenticated: false });
    response.cookies.set(ADMIN_SESSION_COOKIE, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 0,
    });
    return response;
}
