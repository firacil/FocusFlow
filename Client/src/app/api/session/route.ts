import { NextResponse } from 'next/server';
import { createSession, encrypt } from '@/lib/auth/session';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json(); // This is critical
    const { user } = body; // Destructure `user` from the body

    if (!user) {
      return NextResponse.json({ error: 'User data is required' }, { status: 400 });
    }

    await createSession(user);

    return NextResponse.json({ message: 'Session created successfully' });
  } catch (error) {
    console.error('Error parsing request:', error);
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
