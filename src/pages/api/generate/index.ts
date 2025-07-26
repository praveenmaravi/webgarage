// src/pages/api/generate/index.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

type Data = {
  generatedCode?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required and must be a string' });
  }

  try {
    // Call OpenAI's GPT-4 with prompt to generate React + Tailwind code
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful AI assistant that generates React components styled with TailwindCSS based on user prompts.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const generatedCode = completion.choices[0].message?.content || '';

    return res.status(200).json({ generatedCode });
  } catch (error: any) {
    console.error('OpenAI generation error:', error);
    return res.status(500).json({ error: 'Failed to generate code' });
  }
}
