import { OpenAI } from "openai";

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,  // Your OpenAI API key here
});

// Main function to interact with GarageBot AI
export const askGarageBot = async (prompt: string, context?: string) => {
  // Set a default context for GarageBot if not provided
  const systemPrompt = context || `You are GarageBot, a smart assistant helping users design web apps, code websites, and create animations.`;

  try {
    // Send the prompt to OpenAI's chat completion API
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",  // Use the GPT-4 Turbo model
      messages: [
        { role: "system", content: systemPrompt },  // System context for the assistant
        { role: "user", content: prompt },  // User's prompt
      ],
      temperature: 0.7,  // Controls randomness of the response
    });

    // Return the AI's response
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error communicating with GarageBot:", error);
    return "Sorry, there was an issue with the AI. Please try again later.";
  }
};

// Function for handling specific queries related to UI/UX design
export const generateUIDesign = async (description: string) => {
  const prompt = `Create a responsive UI component for the following description: "${description}". Provide the code using React and TailwindCSS.`;
  return await askGarageBot(prompt);
};

// Function for generating backend code based on a task description
export const generateBackendCode = async (taskDescription: string) => {
  const prompt = `Generate backend code (API, database, etc.) for the following task: "${taskDescription}". Use Node.js and Express, or other modern backend technologies.`;
  return await askGarageBot(prompt);
};

// Function for generating animation code using Framer Motion or GSAP
export const generateAnimationCode = async (animationDescription: string) => {
  const prompt = `Generate an animation using GSAP or Framer Motion for the following description: "${animationDescription}". Provide the code in a React component.`;
  return await askGarageBot(prompt);
};

// Function to get suggestions for components or layouts based on a user's use case
export const suggestComponent = async (useCase: string) => {
  const prompt = `Suggest a suitable UI layout or component for the following use case: "${useCase}". Provide the React code along with relevant design patterns.`;
  return await askGarageBot(prompt);
};
