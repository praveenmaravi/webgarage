import { FlowNode } from "../types";

// Type definition for a validation error
export interface ValidationError {
  nodeId: string;
  message: string;
}

/**
 * Validate the flow for structural and logical consistency.
 * @param nodes Array of FlowNode representing the backend flow.
 * @returns An array of ValidationError. Empty if flow is valid.
 */
export const validateFlow = (nodes: FlowNode[]): ValidationError[] => {
  const errors: ValidationError[] = [];
  const seenIds = new Set<string>();

  for (const node of nodes) {
    // Check for unique node ID
    if (seenIds.has(node.id)) {
      errors.push({
        nodeId: node.id,
        message: "Duplicate node ID found",
      });
    } else {
      seenIds.add(node.id);
    }

    // Type-specific validation
    switch (node.type) {
      case "CRUD":
        if (!node.meta?.modelName) {
          errors.push({
            nodeId: node.id,
            message: "CRUD node missing 'modelName'",
          });
        }
        break;

      case "API":
        if (!node.meta?.route) {
          errors.push({
            nodeId: node.id,
            message: "API node missing 'route'",
          });
        }
        break;

      case "Auth":
        if (!node.meta?.strategy) {
          errors.push({
            nodeId: node.id,
            message: "Auth node missing 'strategy' (e.g., JWT, OAuth)",
          });
        }
        break;

      case "DB":
        if (!node.meta?.dbType) {
          errors.push({
            nodeId: node.id,
            message: "Database node missing 'dbType' (e.g., MongoDB, PostgreSQL)",
          });
        }
        break;

      // Add more node types as needed
    }
  }

  // Optional: Validate connection logic if you track edges/links
  // For example: Ensure Auth nodes come before protected APIs

  return errors;
};
