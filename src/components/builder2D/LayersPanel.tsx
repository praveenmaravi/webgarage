"use client";

import { useBuilder2DStore } from "./useBuilder2DStore";
import { cn } from "@/utils/classnames"; // optional helper for conditional classes

export default function LayersPanel() {
  const elements = useBuilder2DStore(state => state.elements);
  const selectedId = useBuilder2DStore(state => state.selectedId);
  const setSelectedId = useBuilder2DStore(state => state.setSelectedId);
  const moveElement = useBuilder2DStore(state => state.moveElement);

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  const moveUp = (index: number) => {
    if (index < elements.length - 1) {
      moveElement(index, index + 1);
    }
  };

  const moveDown = (index: number) => {
    if (index > 0) {
      moveElement(index, index - 1);
    }
  };

  return (
    <div className="w-full bg-white p-3 border-t text-sm">
      <h3 className="font-medium mb-2">Layers</h3>
      <ul className="space-y-1">
        {elements.map((el, index) => (
          <li
            key={el.id}
            className={cn(
              "flex items-center justify-between px-2 py-1 rounded cursor-pointer",
              selectedId === el.id ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
            )}
            onClick={() => handleSelect(el.id)}
          >
            <span>
              {el.type.charAt(0).toUpperCase() + el.type.slice(1)} #{index + 1}
            </span>
            <div className="flex space-x-1">
              <button
                onClick={e => {
                  e.stopPropagation();
                  moveUp(index);
                }}
                disabled={index === elements.length - 1}
                className="text-xs text-gray-500 hover:text-black"
              >
                ↑
              </button>
              <button
                onClick={e => {
                  e.stopPropagation();
                  moveDown(index);
                }}
                disabled={index === 0}
                className="text-xs text-gray-500 hover:text-black"
              >
                ↓
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
