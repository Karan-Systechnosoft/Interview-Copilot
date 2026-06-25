import { NextResponse } from 'next/server';
import { updateJD } from '@/services/database/jd';

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'JD ID is required' }, { status: 400 });
    }

    const updatedJD = await updateJD(id, updates);
    return NextResponse.json({ success: true, data: updatedJD });
  } catch (error: any) {
    console.error('Error updating JD:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
