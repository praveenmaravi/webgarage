'use client';

import { useBuilder2DStore } from './useBuilder2DStore';
import { ChangeEvent } from 'react';

export default function Sidebar() {
  const selectedId = useBuilder2DStore(state => state.selectedId);
  const element = useBuilder2DStore(state =>
    state.elements.find(el => el.id === selectedId)
  );
  const updateElement = useBuilder2DStore(state => state.updateElement);

  if (!element) {
    return (
      <div className="w-64 h-full border-l bg-white p-4 text-gray-600">
        <p>No element selected</p>
      </div>
    );
  }

  const handleChange = (key: string, value: string | number) => {
    updateElement(element.id, { [key]: value });
  };

  return (
    <div className="w-64 h-full border-l bg-white p-4 text-sm">
      <h3 className="text-lg font-semibold mb-4">Properties</h3>

      <div className="mb-2">
        <label className="block mb-1">X Position</label>
        <input
          type="number"
          value={element.x}
          onChange={e => handleChange('x', parseInt(e.target.value))}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div className="mb-2">
        <label className="block mb-1">Y Position</label>
        <input
          type="number"
          value={element.y}
          onChange={e => handleChange('y', parseInt(e.target.value))}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div className="mb-2">
        <label className="block mb-1">Width</label>
        <input
          type="number"
          value={element.width}
          onChange={e => handleChange('width', parseInt(e.target.value))}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div className="mb-2">
        <label className="block mb-1">Height</label>
        <input
          type="number"
          value={element.height}
          onChange={e => handleChange('height', parseInt(e.target.value))}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      {element.type === 'text' && (
        <>
          <div className="mb-2">
            <label className="block mb-1">Text</label>
            <input
              type="text"
              value={element.content}
              onChange={e => handleChange('content', e.target.value)}
              className="w-full border px-2 py-1 rounded"
            />
          </div>

          <div className="mb-2">
            <label className="block mb-1">Font Size</label>
            <input
              type="number"
              value={element.fontSize || 16}
              onChange={e => handleChange('fontSize', parseInt(e.target.value))}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
        </>
      )}

      <div className="mb-2">
        <label className="block mb-1">Background Color</label>
        <input
          type="color"
          value={element.backgroundColor || '#ffffff'}
          onChange={e => handleChange('backgroundColor', e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  );
}
