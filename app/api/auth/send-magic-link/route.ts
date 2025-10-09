import { NextRequest, NextResponse } from 'next/server';
import { ServerClient } from 'postmark';
import jwt from 'jsonwebtoken';

const postmarkClient = new ServerClient(process.env.POSTMARK_SERVER_TOKEN!);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Validate environment variables
    const requiredEnvVars = {
      POSTMARK_SERVER_TOKEN: process.env.POSTMARK_SERVER_TOKEN,
      POSTMARK_FROM_EMAIL: process.env.POSTMARK_FROM_EMAIL,
      POSTMARK_MAGIC_LINK_TEMPLATE_ID: process.env.POSTMARK_MAGIC_LINK_TEMPLATE_ID,
      MAGIC_LINK_SECRET: process.env.MAGIC_LINK_SECRET,
      NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL
    };

    const missingVars = Object.entries(requiredEnvVars)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingVars.length > 0) {
      console.error('Missing environment variables:', missingVars);
      return NextResponse.json({ 
        error: 'Server configuration error', 
        details: `Missing: ${missingVars.join(', ')}` 
      }, { status: 500 });
    }

    // Create a magic link token (expires in 15 minutes)
    const token = jwt.sign(
      { email, purpose: 'magic-link' },
      process.env.MAGIC_LINK_SECRET!,
      { expiresIn: '15m' }
    );

    const magicLink = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify?token=${token}`;

    // Parse template ID and validate
    const templateId = parseInt(process.env.POSTMARK_MAGIC_LINK_TEMPLATE_ID!);
    if (isNaN(templateId)) {
      console.error('Invalid template ID:', process.env.POSTMARK_MAGIC_LINK_TEMPLATE_ID);
      return NextResponse.json({ error: 'Invalid template configuration' }, { status: 500 });
    }

    console.log('Sending email with template ID:', templateId);
    console.log('From email:', process.env.POSTMARK_FROM_EMAIL);
    console.log('To email:', email);

    // Try to send email via Postmark using template
    await postmarkClient.sendEmailWithTemplate({
    From: process.env.POSTMARK_FROM_EMAIL!,
    To: email,
    TemplateId: templateId,
    TemplateModel: {
        magic_link: magicLink,
        user_email: email,
        expiration_time: '15',
        app_name: 'Bitcoin Top'
    },
    MessageStream: 'outbound'
    });

    return NextResponse.json({ success: true, message: 'Magic link sent!' });
  } catch (error) {
    console.error('Error sending magic link:', error);
    
    // More detailed error logging
    if (error && typeof error === 'object') {
      console.error('Error details:', {
        message: (error as any).message,
        code: (error as any).code,
        statusCode: (error as any).statusCode
      });
    }
    
    return NextResponse.json({ 
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}