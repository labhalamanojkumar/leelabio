import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/admin-auth';
import { getCareerApplications } from '@/lib/data-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    if (!isAdminRequest(request)) {
        return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    try {
        const applications = await getCareerApplications();
        return NextResponse.json({ applications });
    } catch (error) {
        console.error('Failed to read career applications:', error);
        return NextResponse.json({ error: 'Career applications are unavailable.' }, { status: 500 });
    }
}
