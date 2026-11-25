import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/admin-auth';
import { deleteJob, updateJob } from '@/lib/data-store';
import { parseJob } from '@/lib/job-validation';

export const runtime = 'nodejs';

interface RouteContext {
    params: Promise<{ id: string }>;
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
    if (!isAdminRequest(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    try {
        const { id } = await params;
        const deleted = await deleteJob(id);
        if (!deleted) return NextResponse.json({ error: 'Opening not found.' }, { status: 404 });
        return NextResponse.json({ deleted: true });
    } catch (error) {
        console.error('Failed to delete career opening:', error);
        return NextResponse.json({ error: 'Career opening could not be deleted.' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
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
        const { id } = await params;
        const updated = await updateJob(id, job);
        if (!updated) return NextResponse.json({ error: 'Opening not found.' }, { status: 404 });
        return NextResponse.json({ job: updated });
    } catch (error) {
        console.error('Failed to update career opening:', error);
        return NextResponse.json({ error: 'Career opening could not be updated.' }, { status: 500 });
    }
}
