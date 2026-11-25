import { createHmac, timingSafeEqual } from 'node:crypto';
import type { NextRequest } from 'next/server';

export const ADMIN_SESSION_COOKIE = 'leelabiologics_admin';
const SESSION_DURATION_SECONDS = 8 * 60 * 60;

export function isAdminConfigured() {
    return Boolean(
        process.env.ADMIN_USERNAME &&
        process.env.ADMIN_PASSWORD &&
        process.env.ADMIN_SESSION_SECRET
    );
}

function signature(expiresAt: string) {
    const secret = process.env.ADMIN_SESSION_SECRET;
    if (!secret) {
        throw new Error('ADMIN_SESSION_SECRET is not configured.');
    }

    return createHmac('sha256', secret).update(expiresAt).digest('base64url');
}

export function createAdminSession() {
    const expiresAt = String(Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS);
    return { token: `${expiresAt}.${signature(expiresAt)}`, expiresAt: Number(expiresAt) };
}

export function isValidAdminSession(token?: string) {
    if (!token || !process.env.ADMIN_SESSION_SECRET) return false;

    const [expiresAt, suppliedSignature] = token.split('.');
    if (!expiresAt || !suppliedSignature || Number(expiresAt) <= Math.floor(Date.now() / 1000)) {
        return false;
    }

    const expected = Buffer.from(signature(expiresAt));
    const actual = Buffer.from(suppliedSignature);
    return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export function credentialsMatch(username: unknown, password: unknown) {
    const expectedUsername = process.env.ADMIN_USERNAME;
    const expectedPassword = process.env.ADMIN_PASSWORD;
    if (!expectedUsername || !expectedPassword || typeof username !== 'string' || typeof password !== 'string') {
        return false;
    }

    const usernameMatches = timingSafeEqual(
        Buffer.from(username.padEnd(expectedUsername.length, '\0').slice(0, expectedUsername.length)),
        Buffer.from(expectedUsername)
    ) && username.length === expectedUsername.length;
    const passwordMatches = timingSafeEqual(
        Buffer.from(password.padEnd(expectedPassword.length, '\0').slice(0, expectedPassword.length)),
        Buffer.from(expectedPassword)
    ) && password.length === expectedPassword.length;

    return usernameMatches && passwordMatches;
}

export function getAdminSessionExpiry() {
    return SESSION_DURATION_SECONDS;
}

export function isAdminRequest(request: NextRequest) {
    return isValidAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
}
