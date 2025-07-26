import { askGarageBot } from "./garageBot";

// Function to suggest UI components based on use case
export const suggestComponent = async (useCase: string) => {
  // Define the prompt to ask the AI assistant
  const prompt = `
    You are a UI/UX designer and React developer. Based on the following use case, suggest the best UI layout or component to use.
    Describe the structure of the component and include the React code with TailwindCSS styles for a responsive layout.

    Use case: ${useCase}
  `;

  // Call the AI assistant to get a response
  const aiResponse = await askGarageBot(prompt);

  // Return the suggested component and structure
  return aiResponse;
};
