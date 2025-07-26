'use client';

import { useObjectStore } from './helpers/useObjectStore';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';

export default function ObjectPanel() {
  const { objects, selectedObjectId, setSelectedObject, removeObject } = useObjectStore();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-full h-full p-3 bg-zinc-900 text-white overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">🧱 Scene Objects</h2>
      {objects.length === 0 && (
        <p className="text-sm text-gray-400">No objects in the scene.</p>
      )}
      <ul className="space-y-2">
        {objects.map((obj) => (
          <li
            key={obj.id}
            onClick={() => setSelectedObject(obj.id)}
            onMouseEnter={() => setHoveredId(obj.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition 
              ${selectedObjectId === obj.id ? 'bg-blue-600' : 'bg-zinc-800'} 
              hover:bg-zinc-700`}
          >
            <span className="truncate">{obj.name || `Object-${obj.id.slice(0, 4)}`}</span>
            {hoveredId === obj.id && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeObject(obj.id);
                }}
                className="text-red-400 hover:text-red-600"
                title="Delete Object"
              >
                <Trash2 size={16} />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
