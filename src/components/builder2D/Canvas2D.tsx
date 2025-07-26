"use client";

import { useBuilder2DStore } from "./useBuilder2DStore";
import ElementRenderer from "./ElementRenderer";
import { useCallback } from "react";

export default function Canvas2D() {
  const { elements, selectedId, setSelectedId, updateElement } = useBuilder2DStore();

  const handleMouseDown = useCallback((e, id) => {
    e.stopPropagation();
    setSelectedId(id);
  }, [setSelectedId]);

  const handleCanvasClick = () => {
    setSelectedId(null); // deselect on empty canvas click
  };

  const handleDrag = (e, element) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newX = e.clientX - rect.left - element.width / 2;
    const newY = e.clientY - rect.top - element.height / 2;
    updateElement(element.id, { x: newX, y: newY });
  };

  return (
    <div
      className="relative w-full h-full bg-gray-50 overflow-hidden border"
      onClick={handleCanvasClick}
    >
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute cursor-move select-none"
          style={{
            top: el.y,
            left: el.x,
            width: el.width,
            height: el.height,
            border: selectedId === el.id ? "2px solid #2563eb" : "none",
          }}
          onMouseDown={(e) => handleMouseDown(e, el.id)}
          onDoubleClick={(e) => e.stopPropagation()}
          draggable
          onDragEnd={(e) => handleDrag(e, el)}
        >
          <ElementRenderer element={el} />
        </div>
      ))}
    </div>
  );
}
