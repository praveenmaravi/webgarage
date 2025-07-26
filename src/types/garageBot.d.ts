// src/types/garageBot.d.ts

export type BotRole = 'user' | 'assistant' | 'system';

export interface BotMessage {
  id: string;                     // Unique message ID
  role: BotRole;                  // 'user' | 'assistant' | 'system'
  content: string;                // Message content (text)
  timestamp: number;             // Unix timestamp
  source?: 'chat' | 'voice' | 'auto'; // Source of the message
  type?: 'text' | 'code' | 'action';  // For rendering or parsing
  relatedComponentId?: string;   // Optional: connect to a UI component
}

export interface BotCommand {
  id: string;
  label: string;                 // e.g., "Generate Hero Section"
  prompt: string;                // Natural language prompt
  actionType: 'code' | 'ui' | 'animation' | 'backend' | 'explain';
  args?: Record<string, any>;    // Additional data passed to AI engine
  createdAt: number;
}

export interface GarageBotState {
  sessionId: string;             // Unique ID for this user session
  messages: BotMessage[];        // Full chat history
  pendingCommand?: BotCommand;   // The current command being executed
  isTyping: boolean;             // Whether GarageBot is "thinking"
  lastInteraction: number;       // For autosave, auto-reply, etc.
  modelUsed?: string;            // e.g., 'gpt-4-turbo'
}
