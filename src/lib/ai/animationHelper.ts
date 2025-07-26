import { askGarageBot } from "./garageBot";

/**
 * Generate animation code for Framer Motion or GSAP based on the user's description.
 * @param description - The animation request, like "Add a bounce-in effect to the hero text."
 * @returns {Promise<string>} - The generated animation code.
 */
export const generateAnimationCode = async (description: string): Promise<string> => {
  // Creating the prompt that will be passed to the AI (GarageBot)
  const prompt = `
    Generate a smooth animation code for the following description:
    "${description}"
    Use either Framer Motion or GSAP for React.
    Provide the code for a React component (if applicable).
    Include necessary imports and styling in TailwindCSS (if applicable).
  `;

  // Asking GarageBot for animation code
  const generatedCode = await askGarageBot(prompt, `You are an expert animation engineer using Framer Motion and GSAP.`);

  return generatedCode;
};

/**
 * Example of usage:
 * const animationCode = await generateAnimationCode("Add a bounce-in effect to the hero text");
 * console.log(animationCode);
 */
