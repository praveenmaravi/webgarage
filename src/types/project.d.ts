export interface Project {
    id: string;
    name: string;
    description?: string;
    ownerId: string;
    collaborators?: string[]; // user IDs of collaborators
    createdAt: string;
    updatedAt: string;
  
    type: 'website' | 'webapp' | 'component' | 'template';
    tags?: string[];
  
    // Layout & editor data
    layouts: ProjectLayout[];
    animationTimelines?: string[];  // timeline IDs
    is3DEnabled: boolean;           // true if React Three Fiber is used
  
    // Backend config
    backendFlowId?: string;
    databaseConnected?: boolean;
    useAuth: boolean;
  
    // Deployment & hosting
    deployedUrl?: string;
    deployPlatform?: 'vercel' | 'netlify' | 'firebase' | 'custom';
    lastDeployedAt?: string;
    deploymentLogs?: string[];
  
    // Marketplace
    isPublic: boolean;
    isListedInMarketplace?: boolean;
    price?: number;
  
    // AI generation
    createdWithAI?: boolean;
    aiPromptUsed?: string;
  }
  
  export interface ProjectLayout {
    id: string;
    name: string;
    mode: '2d' | '3d';                     // layout type
    components: ComponentProps[];
    canvasSize?: {
      width: number;
      height: number;
      depth?: number;
    };
    pageSettings?: Record<string, any>;   // custom settings like SEO, metadata
  }
  
  export interface ComponentProps {
    id: string;
    type: string;                         // e.g., 'button', 'text', 'input', 'model'
    position: {
      x: number;
      y: number;
      z?: number;
    };
    size: {
      width: number;
      height: number;
      depth?: number;
    };
    rotation?: {
      x?: number;
      y?: number;
      z?: number;
    };
    scale?: {
      x?: number;
      y?: number;
      z?: number;
    };
    styles?: Record<string, string | number>;
    children?: ComponentProps[];
    animations?: string[];                // timeline IDs
    events?: Record<string, string>;      // e.g., { onClick: 'openModal' }
    metadata?: Record<string, any>;
  }
  