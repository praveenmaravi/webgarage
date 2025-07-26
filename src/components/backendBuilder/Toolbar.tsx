import { useContext } from 'react';
import { FlowContext } from './FlowContext';

const Toolbar = () => {
  const { addNode } = useContext(FlowContext);

  return (
    <div className="toolbar bg-gray-800 text-white p-4 w-64">
      <h3 className="text-lg font-semibold mb-4">Flow Actions</h3>

      {/* CRUD Node */}
      <div
        className="tool-item mb-3 p-2 bg-blue-600 rounded cursor-pointer hover:bg-blue-500"
        onClick={() => addNode('CRUD')}
      >
        <span className="font-medium">Add CRUD</span>
        <p className="text-sm text-gray-300">Create, Read, Update, Delete operations</p>
      </div>

      {/* Authentication Node */}
      <div
        className="tool-item mb-3 p-2 bg-green-600 rounded cursor-pointer hover:bg-green-500"
        onClick={() => addNode('Auth')}
      >
        <span className="font-medium">Add Auth</span>
        <p className="text-sm text-gray-300">Authentication & Authorization</p>
      </div>

      {/* Database Node */}
      <div
        className="tool-item mb-3 p-2 bg-purple-600 rounded cursor-pointer hover:bg-purple-500"
        onClick={() => addNode('Database')}
      >
        <span className="font-medium">Add Database</span>
        <p className="text-sm text-gray-300">Connect to a Database</p>
      </div>

      {/* API Node */}
      <div
        className="tool-item mb-3 p-2 bg-red-600 rounded cursor-pointer hover:bg-red-500"
        onClick={() => addNode('API')}
      >
        <span className="font-medium">Add API</span>
        <p className="text-sm text-gray-300">Create API routes</p>
      </div>

      {/* Deploy Node */}
      <div
        className="tool-item mb-3 p-2 bg-yellow-600 rounded cursor-pointer hover:bg-yellow-500"
        onClick={() => addNode('Deploy')}
      >
        <span className="font-medium">Deploy</span>
        <p className="text-sm text-gray-300">Deploy your app to the cloud</p>
      </div>

      {/* More components can be added as needed */}
    </div>
  );
};

export default Toolbar;
