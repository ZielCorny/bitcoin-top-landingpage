import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');

    if (!token) {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      return NextResponse.redirect(new URL('/', baseUrl));
    }

    // Verify the magic link token
    const decoded = jwt.verify(token, process.env.MAGIC_LINK_SECRET!) as {
      email: string;
      purpose: string;
    };

    if (decoded.purpose !== 'magic-link') {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      return NextResponse.redirect(new URL('/', baseUrl));
    }

    // Create a session token (expires in 30 days)
    const sessionToken = jwt.sign(
      { email: decoded.email, purpose: 'session' },
      process.env.MAGIC_LINK_SECRET!,
      { expiresIn: '30d' }
    );

    // Set the session cookie
    const cookieStore = await cookies();
    cookieStore.set('session_token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/'
    });

    // Redirect back to homepage using the correct base URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    return NextResponse.redirect(new URL('/', baseUrl));
  } catch (error) {
    console.error('Error verifying token:', error);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    return NextResponse.redirect(new URL('/', baseUrl));
  }
}