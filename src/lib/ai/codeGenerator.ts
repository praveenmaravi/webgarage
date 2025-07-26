import { askGarageBot } from "./garageBot";  // Importing the core GarageBot API function

/**
 * Generate code using AI for frontend or backend tasks.
 * 
 * @param task - A description of the task to generate code for.
 * @param type - The type of code to generate: "frontend" or "backend".
 * @returns - The generated code as a string.
 */
export const generateCode = async (task: string, type: "frontend" | "backend" = "frontend"): Promise<string> => {
  // Generate a prompt for GPT-4 based on the requested task type (frontend or backend)
  const prompt = `Generate ${type} code for the following task:\n${task}\n\nPlease provide the code in the appropriate language and structure for a modern web app.`;

  // Use the askGarageBot function to call GPT-4 and get a response
  const generatedCode = await askGarageBot(prompt, `You are a senior developer proficient in both frontend (React, TailwindCSS) and backend (Node.js, Express, API design).`);
  
  // Return the generated code
  return generatedCode;
};
