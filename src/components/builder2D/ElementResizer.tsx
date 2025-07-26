import React, { useRef, useState } from "react";
import { useBuilder2DStore } from "./useBuilder2DStore";

type Props = {
  element: any;
};

const ElementResizer: React.FC<Props> = ({ element }) => {
  const updateElement = useBuilder2DStore((s) => s.updateElement);
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startPos = { x: element.x, y: element.y };

    setDragging(true);

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      updateElement(element.id, { x: startPos.x + dx, y: startPos.y + dy });
    };

    const onMouseUp = () => {
      setDragging(false);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const handleResize = (e: React.MouseEvent) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startSize = { width: element.width, height: element.height };

    setResizing(true);

    const onMouseMove = (e: MouseEvent) => {
      const dw = e.clientX - startX;
      const dh = e.clientY - startY;

      updateElement(element.id, {
        width: Math.max(20, startSize.width + dw),
        height: Math.max(20, startSize.height + dh),
      });
    };

    const onMouseUp = () => {
      setResizing(false);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      ref={ref}
      onMouseDown={handleMouseDown}
      style={{
        position: "absolute",
        top: element.y,
        left: element.x,
        width: element.width,
        height: element.height,
        border: "1px solid #4f46e5",
        cursor: dragging ? "grabbing" : "grab",
        userSelect: "none",
      }}
    >
      {/* Render actual content */}
      <div className="w-full h-full flex items-center justify-center pointer-events-none">
        {element.content || element.type}
      </div>

      {/* Resize handle */}
      <div
        onMouseDown={handleResize}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 12,
          height: 12,
          backgroundColor: "#4f46e5",
          cursor: "nwse-resize",
        }}
      />
    </div>
  );
};

export default ElementResizer;
