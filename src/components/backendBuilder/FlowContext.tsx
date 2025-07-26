import React, { createContext, useState, useContext, ReactNode } from 'react';

// Types for the Flow Node and Flow State
interface FlowNode {
  id: string;
  type: string; // e.g., CRUD, Auth, DB, etc.
  position: { x: number; y: number };
  properties: any; // Dynamic properties (e.g., database name, API route, etc.)
}

interface FlowState {
  nodes: FlowNode[];
  addNode: (type: string, position: { x: number; y: number }) => void;
  removeNode: (id: string) => void;
  updateNodePosition: (id: string, position: { x: number; y: number }) => void;
  updateNodeProperties: (id: string, properties: any) => void;
  generateCode: () => string;
}

// Initial state for FlowContext
const initialState: FlowState = {
  nodes: [],
  addNode: () => {},
  removeNode: () => {},
  updateNodePosition: () => {},
  updateNodeProperties: () => {},
  generateCode: () => '',
};

// Create the FlowContext
export const FlowContext = createContext<FlowState>(initialState);

// FlowProvider component to provide state and actions
export const FlowProvider = ({ children }: { children: ReactNode }) => {
  const [nodes, setNodes] = useState<FlowNode[]>([]);

  // Add a new node to the flow
  const addNode = (type: string, position: { x: number; y: number }) => {
    const newNode: FlowNode = {
      id: `${nodes.length + 1}`,
      type,
      position,
      properties: {},
    };
    setNodes((prev) => [...prev, newNode]);
  };

  // Remove a node by id
  const removeNode = (id: string) => {
    setNodes((prev) => prev.filter((node) => node.id !== id));
  };

  // Update the position of a node
  const updateNodePosition = (id: string, position: { x: number; y: number }) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id ? { ...node, position } : node
      )
    );
  };

  // Update the properties of a node (e.g., adding fields for a CRUD node)
  const updateNodeProperties = (id: string, properties: any) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id ? { ...node, properties } : node
      )
    );
  };

  // Generate backend code based on flow state
  const generateCode = (): string => {
    let code = '';
    nodes.forEach((node) => {
      switch (node.type) {
        case 'CRUD':
          code += `// CRUD Node\n`;
          code += `const createItem = (data) => { return db.create(data); }\n`;
          break;
        case 'Auth':
          code += `// Auth Node\n`;
          code += `const login = (username, password) => { return auth.login(username, password); }\n`;
          break;
        case 'DB':
          code += `// Database Node\n`;
          code += `const connectToDB = () => { return db.connect(); }\n`;
          break;
        default:
          code += `// Unknown Node Type\n`;
          break;
      }
    });
    return code;
  };

  return (
    <FlowContext.Provider
      value={{
        nodes,
        addNode,
        removeNode,
        updateNodePosition,
        updateNodeProperties,
        generateCode,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};

// Custom hook to use the FlowContext
export const useFlowContext = () => {
  return useContext(FlowContext);
};
