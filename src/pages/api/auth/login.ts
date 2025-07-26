// src/pages/api/auth/login.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../../lib/prisma'; // Make sure prisma client is properly setup

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

type LoginResponse = {
  token?: string;
  user?: {
    id: string;
    email: string;
    name?: string | null;
  };
  message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<LoginResponse>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password hashes
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create JWT payload
    const payload = {
      userId: user.id,
      email: user.email,
    };

    // Sign JWT token (expires in 7 days)
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    // Send token and user info (exclude password)
    return res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
