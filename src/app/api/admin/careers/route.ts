import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/admin-auth';
import { createJob, getAdminData } from '@/lib/data-store';
import { parseJob } from '@/lib/job-validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    if (!isAdminRequest(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    try {
        const { jobs } = await getAdminData();
        return NextResponse.json({ jobs });
    } catch (error) {
        console.error('Failed to read career openings:', error);
        return NextResponse.json({ error: 'Career openings are unavailable.' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    if (!isAdminRequest(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    let input: unknown;
    try {
        input = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
    }
    const job = parseJob(input);
    if (!job) return NextResponse.json({ error: 'Complete all required fields with valid contact details.' }, { status: 400 });

    try {
        const created = await createJob(job);
        return NextResponse.json({ job: created }, { status: 201 });
    } catch (error) {
        console.error('Failed to create career opening:', error);
        return NextResponse.json({ error: 'Career opening could not be saved.' }, { status: 500 });
    }
}
