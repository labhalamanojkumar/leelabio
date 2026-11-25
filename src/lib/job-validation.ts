import { randomUUID } from 'node:crypto';
import { slugify } from '@/lib/data-store';
import type { JobOpening } from '@/lib/jobs';

export function parseJob(value: unknown): Omit<JobOpening, 'id'> | null {
    if (!value || typeof value !== 'object') return null;
    const body = value as Record<string, unknown>;
    const fields = ['title', 'department', 'location', 'type', 'experience', 'shortDescription', 'overview', 'email'];
    if (fields.some((field) => typeof body[field] !== 'string' || !(body[field] as string).trim())) return null;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email as string)) return null;

    const list = (item: unknown) =>
        Array.isArray(item) && item.length <= 30 && item.every((entry) => typeof entry === 'string' && entry.trim())
            ? item.map((entry: string) => entry.trim().slice(0, 1000))
            : null;
    const responsibilities = list(body.responsibilities);
    const qualifications = list(body.qualifications);
    if (!responsibilities || !qualifications) return null;

    const title = (body.title as string).trim().slice(0, 180);
    const reqId = typeof body.reqId === 'string' && body.reqId.trim()
        ? body.reqId.trim().slice(0, 40)
        : `REQ-${new Date().getFullYear()}-${randomUUID().slice(0, 8).toUpperCase()}`;
    return {
        slug: (typeof body.slug === 'string' && body.slug.trim() ? slugify(body.slug) : '') || slugify(title),
        title,
        department: (body.department as string).trim().slice(0, 100),
        location: (body.location as string).trim().slice(0, 150),
        type: (body.type as string).trim().slice(0, 80),
        experience: (body.experience as string).trim().slice(0, 80),
        reqId,
        shortDescription: (body.shortDescription as string).trim().slice(0, 500),
        overview: (body.overview as string).trim().slice(0, 5000),
        responsibilities,
        qualifications,
        email: (body.email as string).trim().slice(0, 254),
    };
}
