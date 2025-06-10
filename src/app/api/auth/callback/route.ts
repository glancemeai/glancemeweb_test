//api/auth/callback.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.redirect('http://localhost:3000/?error=missing_code');
  }

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: 'http://localhost:3000/api/auth/callback',
      grant_type: 'authorization_code',
    }),
  });

  const tokens = await tokenRes.json();

  if (!tokens.access_token) {
    return NextResponse.redirect('http://localhost:3000/?error=invalid_token');
  }

  // ✅ Redirect to frontend route with token (absolute URL required)
  return NextResponse.redirect(`http://localhost:3000/meetingScheduler?token=${tokens.access_token}`);
}
