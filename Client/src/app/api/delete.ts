// pages/api/session/delete.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Use cookies from 'next/headers' to delete the session cookie
    cookies().delete('session');

    res.status(200).json({ message: 'Session deleted successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
