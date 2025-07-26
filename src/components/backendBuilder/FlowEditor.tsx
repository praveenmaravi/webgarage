import React, { useState, useContext } from 'react';
import { FlowContext } from './FlowContext';
import Canvas from './Canvas';
import FlowSidebar from './FlowSidebar';
import Toolbar from './Toolbar';
import CodePreview from './CodePreview';

const FlowEditor = () => {
  // Accessing flow context to get the flow state (nodes) and functions like addNode
  const { flowState, addNode } = useContext(FlowContext);

  // Handle flow validation (optional)
  const handleValidateFlow = () => {
    // Validation logic can be added here (e.g., checking for missing connections)
    console.log('Validating flow...');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar for available actions */}
      <FlowSidebar />

      {/* Main editor container */}
      <div className="flex-1 flex flex-col bg-gray-50 p-4">
        {/* Toolbar containing buttons for adding actions */}
        <Toolbar addNode={addNode} />

        {/* Canvas to display nodes and their connections */}
        <div className="flex-1 flex overflow-hidden bg-white border rounded-lg">
          <Canvas flowState={flowState} />
        </div>

        {/* Button to trigger flow validation */}
        <div className="mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleValidateFlow}
          >
            Validate Flow
          </button>
        </div>
        
        {/* Preview of generated backend code */}
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">Generated Code Preview</h3>
          <CodePreview flowState={flowState} />
        </div>
      </div>
    </div>
  );
};

export default FlowEditor;
