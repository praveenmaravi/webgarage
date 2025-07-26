import React, { useState, useContext, useEffect } from 'react';
import { FlowContext } from './FlowContext';
import Node from './Node';
import { FlowNode } from '../types';
import { generateNodePosition, handleDragNode } from './utils';

const Canvas = () => {
  const { flowState, setFlowState } = useContext(FlowContext);
  const [isDragging, setIsDragging] = useState(false);

  const { nodes } = flowState;

  useEffect(() => {
    // Optionally, you can add an event listener for canvas resizing
    // or any other global adjustments needed here.
  }, []);

  // Handles the drag event for a node (to update position)
  const onNodeDrag = (e: React.DragEvent, nodeId: string) => {
    setIsDragging(true);

    // Handle the drag (set node position)
    handleDragNode(e, nodeId, flowState, setFlowState);
  };

  // Render each node on the canvas
  const renderNodes = () => {
    return nodes.map((node: FlowNode) => (
      <Node
        key={node.id}
        id={node.id}
        type={node.type}
        position={node.position}
        onDrag={onNodeDrag}
      />
    ));
  };

  return (
    <div
      className="canvas bg-gray-100 relative w-full h-full"
      style={{
        minHeight: '500px', // Set a minimum height for the canvas
      }}
    >
      {/* Background Grid */}
      <div className="grid grid-cols-12 grid-rows-12 gap-2 absolute top-0 left-0 w-full h-full z-0">
        {/* Optionally you can make it a full-page grid to have a visual sense */}
        {/* of a large canvas */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="w-full h-full border-t border-l border-gray-300"></div>
        ))}
      </div>

      {/* Render flow nodes */}
      <div className="nodes-container z-10">{renderNodes()}</div>

      {/* Optional: Display other UI elements, such as line connectors or actions */}
    </div>
  );
};

export default Canvas;
