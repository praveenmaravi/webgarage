import { useState, useRef, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { FlowContext } from './FlowContext';
import { useContext } from 'react';

// Types for the node
interface NodeProps {
  id: string;
  type: string;
  position: { x: number; y: number };
  onMove: (id: string, newPosition: { x: number, y: number }) => void;
}

const Node = ({ id, type, position, onMove }: NodeProps) => {
  const { nodes, setNodes } = useContext(FlowContext);
  const nodeRef = useRef<HTMLDivElement>(null);
  const [nodePosition, setNodePosition] = useState(position);

  // Dragging functionality using react-dnd
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'NODE',
    item: { id, type, position: nodePosition },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleDrag = (e: React.DragEvent) => {
    // Calculate new position as the user drags
    const x = e.clientX - nodeRef.current!.offsetWidth / 2;
    const y = e.clientY - nodeRef.current!.offsetHeight / 2;
    setNodePosition({ x, y });

    // Update the node position in the parent component (Canvas)
    onMove(id, { x, y });
  };

  useEffect(() => {
    setNodePosition(position);
  }, [position]);

  // Handle editing or setting node-specific settings (like adding API URL, CRUD operations)
  const handleNodeSettings = () => {
    const newType = prompt('Enter node type', type);
    if (newType && newType !== type) {
      // Update the type of the node
      const updatedNodes = nodes.map((node) =>
        node.id === id ? { ...node, type: newType } : node
      );
      setNodes(updatedNodes);
    }
  };

  return (
    <div
      ref={nodeRef}
      className={`node p-4 rounded-lg shadow-md ${isDragging ? 'opacity-50' : ''}`}
      style={{
        left: nodePosition.x,
        top: nodePosition.y,
        position: 'absolute',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
      }}
      draggable
      onDrag={handleDrag}
      onClick={handleNodeSettings}
    >
      <div className="node-header flex justify-between items-center">
        <span className="node-type font-semibold">{type}</span>
        <span className="node-id text-xs text-gray-500">ID: {id}</span>
      </div>
      {/* Add more node-specific settings/components here (e.g., CRUD fields, API URL) */}
    </div>
  );
};

export default Node;
