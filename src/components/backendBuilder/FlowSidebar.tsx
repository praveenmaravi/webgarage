import React, { useContext } from 'react';
import { FlowContext } from './FlowContext';

const FlowSidebar = () => {
  const { addNode } = useContext(FlowContext);  // Extract the function to add a new node

  // Action buttons for different backend flow components
  const handleAddNode = (type: string) => {
    addNode(type);
  };

  return (
    <div className="flow-sidebar bg-gray-200 w-72 p-4 overflow-y-auto">
      <h3 className="text-xl font-semibold mb-4">Available Actions</h3>
      
      <ul className="space-y-4">
        {/* CRUD Operation */}
        <li className="cursor-pointer p-2 rounded-md hover:bg-gray-300" onClick={() => handleAddNode('CRUD')}>
          <span className="font-medium">Add CRUD</span>
          <p className="text-sm text-gray-500">Create, Read, Update, Delete operations</p>
        </li>
        
        {/* Authentication */}
        <li className="cursor-pointer p-2 rounded-md hover:bg-gray-300" onClick={() => handleAddNode('Auth')}>
          <span className="font-medium">Add Auth</span>
          <p className="text-sm text-gray-500">Authentication logic (Login, Register)</p>
        </li>
        
        {/* Database */}
        <li className="cursor-pointer p-2 rounded-md hover:bg-gray-300" onClick={() => handleAddNode('Database')}>
          <span className="font-medium">Add Database</span>
          <p className="text-sm text-gray-500">Integrate with a database</p>
        </li>
        
        {/* API Route */}
        <li className="cursor-pointer p-2 rounded-md hover:bg-gray-300" onClick={() => handleAddNode('API')}>
          <span className="font-medium">Add API Route</span>
          <p className="text-sm text-gray-500">Create a custom API route</p>
        </li>
        
        {/* Serverless Function */}
        <li className="cursor-pointer p-2 rounded-md hover:bg-gray-300" onClick={() => handleAddNode('Serverless')}>
          <span className="font-medium">Add Serverless Function</span>
          <p className="text-sm text-gray-500">Create serverless functions for backend logic</p>
        </li>
        
        {/* Custom Logic */}
        <li className="cursor-pointer p-2 rounded-md hover:bg-gray-300" onClick={() => handleAddNode('CustomLogic')}>
          <span className="font-medium">Add Custom Logic</span>
          <p className="text-sm text-gray-500">Write custom logic for API requests</p>
        </li>
      </ul>
    </div>
  );
};

export default FlowSidebar;
