'use client';

import { Plus, Type, ImageIcon, Square, MousePointerClick } from 'lucide-react';
import { useBuilder2DStore } from './useBuilder2DStore';

const Toolbar = () => {
  const addElement = useBuilder2DStore(state => state.addElement);

  const tools = [
    { type: 'text', label: 'Text', icon: Type },
    { type: 'rectangle', label: 'Box', icon: Square },
    { type: 'image', label: 'Image', icon: ImageIcon },
    { type: 'button', label: 'Button', icon: MousePointerClick },
  ];

  return (
    <div className="flex gap-3 px-4 py-2 bg-white border-b shadow-sm items-center z-10">
      <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
        <Plus size={18} /> Add Element
      </h2>

      {tools.map(({ type, label, icon: Icon }) => (
        <button
          key={type}
          onClick={() => addElement(type)}
          className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md hover:bg-gray-100 transition"
        >
          <Icon size={16} />
          {label}
        </button>
      ))}
    </div>
  );
};

export default Toolbar;
