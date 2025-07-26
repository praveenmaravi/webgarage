// botUtils.ts

// Format the prompt before sending it to OpenAI
export function formatPrompt(userInput: string) {
    return `You are GarageBot, a helpful AI assistant integrated within a web development studio. Your job is to assist the user with web development tasks like generating code, fixing errors, and providing explanations. The user will ask you specific questions or request certain actions. Here is the user's request:\n"${userInput}"\nPlease provide a detailed, helpful, and informative response.`;
  }
  
  // Generate a simple chat-based prompt for interacting with GarageBot
  export function createChatPrompt(userInput: string) {
    return [
      {
        role: "system",
        content:
          "You are GarageBot, a developer assistant for building web apps, offering solutions related to UI/UX design, backend logic, animation, and more. Provide accurate, context-specific responses based on the user's queries.",
      },
      {
        role: "user",
        content: userInput,
      },
    ];
  }
  
  // Format the response from the AI, ensuring it's clean and ready for display
  export function formatBotResponse(response: string) {
    // Clean up any excess whitespaces, newlines, etc.
    return response.trim();
  }
  
  // Handle additional formatting if needed (for example, markdown or code syntax)
  export function handleCodeResponse(response: string) {
    // Check for code patterns and wrap them in markdown syntax if necessary
    if (response.includes("```")) {
      return response;
    }
    return "```tsx\n" + response + "\n```"; // Wrap non-formatted code in a markdown block
  }
  
  // Function to debounce input to prevent too many calls to the AI API
  export function debounce(func: Function, delay: number) {
    let timeout: NodeJS.Timeout;
    return function (...args: any[]) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }
  
  // Handle errors and sanitize unexpected situations
  export function handleError(error: any) {
    console.error(error);
    return "Sorry, something went wrong. Please try again.";
  }
  