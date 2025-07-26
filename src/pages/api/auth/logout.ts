// src/pages/api/auth/logout.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Clear the cookie storing the JWT token by setting it to expired
  res.setHeader('Set-Cookie', `token=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`);

  res.status(200).json({ message: 'Logged out successfully' });
}
