import { NextRequest } from 'next/server';
import { isAdminRequest } from '@/lib/admin-auth';
import { getCareerApplicationResume } from '@/lib/data-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface RouteContext {
    params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteContext) {
    if (!isAdminRequest(request)) {
        return Response.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    try {
        const { id } = await params;
        const resume = await getCareerApplicationResume(id);
        if (!resume) return Response.json({ error: 'Resume not found.' }, { status: 404 });

        const safeFileName = resume.fileName.replace(/[\r\n"]/g, '_');
        return new Response(new Uint8Array(resume.data), {
            headers: {
                'Content-Type': resume.contentType,
                'Content-Disposition': `attachment; filename="resume"; filename*=UTF-8''${encodeURIComponent(safeFileName)}`,
                'Cache-Control': 'private, no-store',
                'X-Content-Type-Options': 'nosniff',
            },
        });
    } catch (error) {
        console.error('Failed to retrieve career application resume:', error);
        return Response.json({ error: 'Resume is unavailable.' }, { status: 500 });
    }
}
