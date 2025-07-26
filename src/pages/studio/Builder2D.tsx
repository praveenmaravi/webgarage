import React, { useState, useRef, useEffect } from "react";

type ComponentItem = {
  id: string;
  type: "button" | "card" | "text";
  x: number;
  y: number;
  width: number;
  height: number;
  text?: string;
};

const defaultComponents: ComponentItem[] = [
  { id: "1", type: "button", x: 50, y: 50, width: 120, height: 40, text: "Click Me" },
  { id: "2", type: "card", x: 200, y: 100, width: 200, height: 120, text: "Card Content" },
];

const Builder2D: React.FC = () => {
  const [components, setComponents] = useState<ComponentItem[]>(defaultComponents);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse down on a component to start dragging
  const onDragStart = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const comp = components.find(c => c.id === id);
    if (!comp) return;
    setDraggingId(id);
    const rect = e.currentTarget.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setSelectedId(id);
  };

  // Mouse move on container to move component
  const onDragMove = (e: React.MouseEvent) => {
    if (!draggingId) return;

    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const x = e.clientX - containerRect.left - dragOffset.current.x;
    const y = e.clientY - containerRect.top - dragOffset.current.y;

    setComponents(prev =>
      prev.map(c =>
        c.id === draggingId
          ? {
              ...c,
              x: Math.max(0, Math.min(x, containerRect.width - c.width)),
              y: Math.max(0, Math.min(y, containerRect.height - c.height)),
            }
          : c
      )
    );
  };

  // Mouse up stops dragging
  const onDragEnd = () => {
    setDraggingId(null);
  };

  // Deselect on container click
  const onContainerClick = () => {
    setSelectedId(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={onDragMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      onClick={onContainerClick}
      className="relative bg-white border border-gray-300 rounded-md w-full h-full"
      style={{ userSelect: draggingId ? "none" : "auto" }}
    >
      {components.map(comp => (
        <div
          key={comp.id}
          onMouseDown={e => onDragStart(e, comp.id)}
          className={`absolute cursor-move select-none shadow ${
            selectedId === comp.id ? "ring-2 ring-blue-500" : ""
          }`}
          style={{
            top: comp.y,
            left: comp.x,
            width: comp.width,
            height: comp.height,
            backgroundColor: comp.type === "button" ? "#3b82f6" : comp.type === "card" ? "#f9fafb" : "transparent",
            color: comp.type === "button" ? "white" : "black",
            borderRadius: comp.type === "button" ? 6 : 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: comp.type === "button" ? "600" : "normal",
            boxShadow: comp.type === "card" ? "0 1px 4px rgba(0,0,0,0.1)" : undefined,
            padding: comp.type === "card" ? 12 : undefined,
            fontSize: 14,
          }}
        >
          {comp.text}
        </div>
      ))}
    </div>
  );
};

export default Builder2D;
