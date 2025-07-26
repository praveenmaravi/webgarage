export interface UserProfile {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    role: UserRole;
    bio?: string;
    createdAt: string;
    updatedAt: string;
    preferences?: UserPreferences;
    linkedProviders?: AuthProvider[];
    projects?: string[]; // Array of project IDs
  }
  
  export type UserRole = 'admin' | 'creator' | 'user' | 'guest';
  
  export interface UserPreferences {
    theme?: 'light' | 'dark' | 'system';
    defaultMode?: '2d' | '3d' | 'animation';
    language?: string;
    showTips?: boolean;
    aiSuggestions?: boolean;
  }
  
  export interface AuthProvider {
    provider: 'google' | 'github' | 'discord' | 'email' | 'custom';
    linkedAt: string;
  }
  