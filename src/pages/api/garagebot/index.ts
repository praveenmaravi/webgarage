// src/pages/api/garagebot/index.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

type Data = {
  response?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed, use POST." });
  }

  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Missing or invalid 'prompt'." });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Or "gpt-4-turbo" if available in your plan
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const aiResponse = completion.choices[0].message?.content || "";

    res.status(200).json({ response: aiResponse });
  } catch (error: any) {
    console.error("GarageBot API error:", error);
    res.status(500).json({ error: "Failed to generate AI response." });
  }
}
