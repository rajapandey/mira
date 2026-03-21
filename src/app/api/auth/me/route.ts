import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Check if user is authenticated (you would typically verify a session/token here)
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Mock user data for now - replace with actual user lookup
  const mockUser = {
    id: '1',
    email: 'user@example.com',
    name: 'Demo User',
  };

  return NextResponse.json(mockUser);
}
