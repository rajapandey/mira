import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Mock logout logic - in a real app, you would invalidate the session/token
  return NextResponse.json({ message: 'Logged out successfully' });
}
