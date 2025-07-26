import React, { useRef, useState } from "react";
import { useBuilder2DStore } from "./useBuilder2DStore";

interface ElementDraggerProps {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  children: React.ReactNode;
}

const ElementDragger: React.FC<ElementDraggerProps> = ({
  id,
  x,
  y,
  width,
  height,
  children,
}) => {
  const updateElement = useBuilder2DStore((state) => state.updateElement);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const initialPos = useRef({ x, y });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    dragStart.current = { x: e.clientX, y: e.clientY };
    initialPos.current = { x, y };
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;

    updateElement(id, {
      x: initialPos.current.x + dx,
      y: initialPos.current.y + dy,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDownWrapper = (e: React.MouseEvent) => {
    handleMouseDown(e);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className={`absolute cursor-move`}
      onMouseDown={handleMouseDownWrapper}
      style={{
        top: y,
        left: x,
        width,
        height,
        zIndex: isDragging ? 1000 : 1,
        userSelect: "none",
      }}
    >
      {children}
    </div>
  );
};

export default ElementDragger;
