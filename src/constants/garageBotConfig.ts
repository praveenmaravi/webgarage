// src/constants/garageBotConfig.ts

export const garageBotDefaults = {
    // Language setting for the bot
    language: "en",  // Can be extended to support other languages like 'es', 'fr', etc.
    
    // Tone of the responses: can be dynamic or static
    tone: "friendly",  // Options: "friendly", "professional", "empathetic", "casual"
    
    // Maximum response length from GarageBot
    maxResponseLength: 300,  // Max characters the bot can return in one response
    
    // Default context: the current project or task the bot is working on
    context: {
      project: null,  // A project context to keep track of the user's active project
      lastCommand: null,  // Tracks the last command the bot responded to
    },
  
    // Quick replies available to the user
    quickReplies: [
      { label: "Create UI", value: "create_ui" },
      { label: "Generate Code", value: "generate_code" },
      { label: "Fix Bug", value: "fix_bug" },
      { label: "Add Animation", value: "add_animation" },
      { label: "Deploy Project", value: "deploy_project" },
      { label: "Help", value: "help" },
    ],
  
    // Defines bot's conversational capabilities (e.g., giving suggestions, debugging)
    capabilities: {
      // Enable/disable project creation suggestions
      suggestProject: true, 
      
      // Enable/disable automatic code generation for layouts
      autoGenerateCode: true, 
      
      // Enable/disable debugging capabilities (detect issues in code)
      debugProject: true, 
      
      // Enable/disable animation effect application
      applyAnimations: true,
      
      // Enable/disable hosting and deployment capabilities
      deployProject: true,
    },
  
    // Predefined commands and their description for quick access
    garageBotCommands: [
      { 
        command: "Create UI", 
        description: "Generate UI components like forms, buttons, and layouts." 
      },
      { 
        command: "Generate Code", 
        description: "Provides code snippets for layouts, elements, and components." 
      },
      { 
        command: "Fix Bug", 
        description: "Helps debug the issues in your project code." 
      },
      { 
        command: "Add Animation", 
        description: "Applies animation effects (fade, slide, bounce, etc.) to components." 
      },
      { 
        command: "Deploy Project", 
        description: "Deploys the project to a hosting platform (e.g., Vercel, Netlify)." 
      },
      { 
        command: "Help", 
        description: "Provides a list of commands and options available in GarageBot." 
      },
    ],
  
    // Response formats
    responseFormat: {
      // Available response formats for GarageBot
      text: "text",  // Regular text responses
      code: "code",  // Code blocks for programming-related tasks
      list: "list",  // List of options/commands in bullet points
      json: "json",  // Return JSON data for integrations or output
    },
  
    // Custom responses based on the tone (could be expanded further)
    toneResponses: {
      friendly: {
        greeting: "Hey there! How can I assist you today?",
        goodbye: "Goodbye! Let me know if you need more help. 😊",
        error: "Oops! Something went wrong. Let me try again.",
      },
      professional: {
        greeting: "Hello. How may I assist you with your project today?",
        goodbye: "Thank you for using WebGarage. Have a productive day.",
        error: "An error occurred. Please check your input and try again.",
      },
      empathetic: {
        greeting: "Hi! How can I make your day easier?",
        goodbye: "I hope I was able to help. Take care and reach out if needed.",
        error: "Oh no! It seems something went wrong. Let’s fix that together.",
      },
      casual: {
        greeting: "Yo! What’s up? How can I help today?",
        goodbye: "Catch you later! Let me know if you need anything.",
        error: "Whoops! Something’s broken. Let me fix it ASAP!",
      },
    },
  };
  
  export default garageBotDefaults;
  