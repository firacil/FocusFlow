// pages/api/session/update.ts
import { encrypt } from '@/lib/auth/session';
import { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { newSessionData } = req.body;

    if (!newSessionData) {
      return res.status(400).json({ error: 'New session data is required' });
    }

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const newSession = await encrypt({
      user: newSessionData,
      expiresAt,
    });

    // Set the updated session cookie
    cookies().set('session', newSession, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    });

    res.status(200).json({ message: 'Session updated successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
