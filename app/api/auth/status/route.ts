import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('session_token')?.value;

    if (!sessionToken) {
      return NextResponse.json({
        authenticated: false,
        email: null,
      });
    }

    // Verify the session token
    const decoded = jwt.verify(sessionToken, process.env.MAGIC_LINK_SECRET!) as {
      email: string;
      purpose: string;
    };

    // Check if it's a valid session token
    if (decoded.purpose === 'session') {
      return NextResponse.json({
        authenticated: true,
        email: decoded.email,
      });
    } else {
      return NextResponse.json({
        authenticated: false,
        email: null,
      });
    }
  } catch (error) {
    // Token is invalid, expired, or malformed
    console.error('Session token validation error:', error);
    return NextResponse.json({
      authenticated: false,
      email: null,
    });
  }
}