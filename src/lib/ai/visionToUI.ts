import OpenAI from "openai";
import { IncomingMessage } from "http";

// Initialize OpenAI API client with your key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // Ensure you have your OpenAI API key in .env
});

// Function to convert base64 image to UI code
export const imageToUI = async (base64Image: string) => {
  try {
    // Send image data to GPT-4 with Vision capabilities
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",  // Use the Vision-enabled GPT-4 model (if available)
      messages: [
        {
          role: "system",
          content: "You are an expert UI developer. Convert this image to a React component with TailwindCSS styles.",
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Please analyze this image and generate the corresponding UI code." },
            {
              type: "image_url",
              image_url: {
                url: `data:image/png;base64,${base64Image}`, // Encode image as base64 and send it to API
              },
            },
          ],
        },
      ],
    });

    // Extract code from the GPT response
    const code = response.choices[0].message.content;
    return code;
  } catch (error) {
    console.error("Error processing the image to UI:", error);
    throw new Error("Failed to generate UI code from image.");
  }
};
