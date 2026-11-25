import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/admin-auth';
import { getAdminData } from '@/lib/data-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    if (!isAdminRequest(request)) {
        return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    try {
        const { leads } = await getAdminData();
        return NextResponse.json({ leads });
    } catch (error) {
        console.error('Failed to read contact leads:', error);
        return NextResponse.json({ error: 'Contact leads are unavailable.' }, { status: 500 });
    }
}
