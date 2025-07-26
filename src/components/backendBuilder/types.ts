// Node Types (CRUD, Auth, DB, etc.)
export type NodeType = 'CRUD' | 'Auth' | 'DB' | 'API' | 'Logic' | 'Webhook';

// Position in the Canvas
export interface Position {
  x: number;
  y: number;
}

// Base interface for a Node in the Flow
export interface FlowNode {
  id: string;                   // Unique identifier for the node
  type: NodeType;               // Type of node (CRUD, Auth, etc.)
  position: Position;           // x, y coordinates on canvas
  data: NodeData;               // Node-specific configuration
  connections?: string[];       // IDs of connected nodes
}

// Configuration for a node
export interface NodeData {
  name: string;                 // Name/label of the node
  inputs?: string[];            // Expected input fields
  outputs?: string[];           // Output fields or responses
  route?: string;               // API route (e.g., "/users")
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';  // HTTP method
  databaseTable?: string;       // For DB-related nodes
  schema?: Record<string, string>; // Field schema (e.g., { name: 'string', age: 'number' })
  authRequired?: boolean;       // If this endpoint requires auth
  customCode?: string;          // Optional custom logic
}

// Entire Flow State
export interface FlowState {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

// Edge between two nodes
export interface FlowEdge {
  from: string;  // Source node ID
  to: string;    // Target node ID
}
