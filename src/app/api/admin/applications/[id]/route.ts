import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/admin-auth';
import { isCareerApplicationStatus, updateCareerApplicationStatus } from '@/lib/data-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface RouteContext {
    params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
    if (!isAdminRequest(request)) {
        return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    let input: unknown;
    try {
        input = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
    }
    if (typeof input !== 'object' || input === null || !('status' in input) || !isCareerApplicationStatus(input.status)) {
        return NextResponse.json({ error: 'Select a valid application status.' }, { status: 400 });
    }

    const { id } = await params;
    try {
        const updated = await updateCareerApplicationStatus(id, input.status);
        if (!updated) return NextResponse.json({ error: 'Application not found.' }, { status: 404 });
        return NextResponse.json({ updated: true, status: input.status });
    } catch (error) {
        console.error('Failed to update career application:', error);
        return NextResponse.json({ error: 'Career application status could not be updated.' }, { status: 500 });
    }
}
