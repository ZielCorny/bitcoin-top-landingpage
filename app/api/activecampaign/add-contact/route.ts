import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('session_token')?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(sessionToken, process.env.MAGIC_LINK_SECRET!) as {
      email: string;
    };

    // Add or update contact in ActiveCampaign
    const response = await fetch(`${process.env.ACTIVECAMPAIGN_API_URL}/api/3/contact/sync`, {
      method: 'POST',
      headers: {
        'Api-Token': process.env.ACTIVECAMPAIGN_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contact: {
          email: decoded.email,
          fieldValues: [
            {
              field: '1', // Adjust field ID as needed
              value: new Date().toISOString(),
            },
          ],
        },
      }),
    });

    const data = await response.json();

    return NextResponse.json({ success: true, contactId: data.contact.id });
  } catch (error) {
    console.error('Error adding to ActiveCampaign:', error);
    return NextResponse.json({ error: 'Failed to add contact' }, { status: 500 });
  }
}