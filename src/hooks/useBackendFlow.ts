import { useState, useCallback } from "react";
import { nanoid } from "nanoid";

type NodeType = "input" | "database" | "api" | "logic" | "output";

interface FlowNode {
  id: string;
  type: NodeType;
  label: string;
  data: Record<string, any>;
  position: { x: number; y: number };
}

interface FlowEdge {
  id: string;
  from: string;
  to: string;
}

export function useBackendFlow() {
  const [nodes, setNodes] = useState<FlowNode[]>([]);
  const [edges, setEdges] = useState<FlowEdge[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Add a new node
  const addNode = useCallback((type: NodeType, label = type, position = { x: 100, y: 100 }) => {
    const id = nanoid();
    const newNode: FlowNode = {
      id,
      type,
      label,
      data: {},
      position
    };
    setNodes(prev => [...prev, newNode]);
    return id;
  }, []);

  // Remove a node and its related edges
  const removeNode = useCallback((id: string) => {
    setNodes(prev => prev.filter(node => node.id !== id));
    setEdges(prev => prev.filter(edge => edge.from !== id && edge.to !== id));
  }, []);

  // Update node data
  const updateNode = useCallback((id: string, newData: Partial<FlowNode>) => {
    setNodes(prev =>
      prev.map(node => (node.id === id ? { ...node, ...newData } : node))
    );
  }, []);

  // Add edge between two nodes
  const addEdge = useCallback((from: string, to: string) => {
    const edgeId = `${from}-${to}`;
    const exists = edges.find(edge => edge.id === edgeId);
    if (!exists) {
      setEdges(prev => [...prev, { id: edgeId, from, to }]);
    }
  }, [edges]);

  // Remove edge
  const removeEdge = useCallback((id: string) => {
    setEdges(prev => prev.filter(edge => edge.id !== id));
  }, []);

  // Move node (drag)
  const moveNode = useCallback((id: string, x: number, y: number) => {
    setNodes(prev =>
      prev.map(node =>
        node.id === id ? { ...node, position: { x, y } } : node
      )
    );
  }, []);

  return {
    nodes,
    edges,
    selectedNode,
    setSelectedNode,
    addNode,
    removeNode,
    updateNode,
    moveNode,
    addEdge,
    removeEdge
  };
}
