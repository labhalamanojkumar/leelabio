import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/admin-auth';
import { deleteContactLead, isLeadStatus, updateContactLeadStatus } from '@/lib/data-store';

export const runtime = 'nodejs';

interface RouteContext {
    params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
    if (!isAdminRequest(request)) {
        return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    let body: { status?: unknown };
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
    }
    if (!isLeadStatus(body.status)) {
        return NextResponse.json({ error: 'Invalid lead status.' }, { status: 400 });
    }

    try {
        const { id } = await params;
        const updated = await updateContactLeadStatus(id, body.status);
        if (!updated) return NextResponse.json({ error: 'Lead not found.' }, { status: 404 });
        return NextResponse.json({ updated: true });
    } catch (error) {
        console.error('Failed to update contact lead:', error);
        return NextResponse.json({ error: 'Lead status could not be updated.' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
    if (!isAdminRequest(request)) {
        return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    try {
        const { id } = await params;
        const deleted = await deleteContactLead(id);
        if (!deleted) return NextResponse.json({ error: 'Lead not found.' }, { status: 404 });
        return NextResponse.json({ deleted: true });
    } catch (error) {
        console.error('Failed to delete contact lead:', error);
        return NextResponse.json({ error: 'Lead could not be deleted.' }, { status: 500 });
    }
}
