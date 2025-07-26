// src/pages/studio/RealtimeCollabOverlay.tsx

import React, { useEffect, useState, useRef } from "react";

type Collaborator = {
  id: string;
  name: string;
  color: string;        // Unique color per user
  cursorX: number;      // Normalized cursor position (0 to 1)
  cursorY: number;
  selectionRect?: {     // Optional: rectangle for selection area
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

type RealtimeCollabOverlayProps = {
  socket?: WebSocket | any;  // Your WebSocket or socket.io client instance
};

const RealtimeCollabOverlay: React.FC<RealtimeCollabOverlayProps> = ({ socket }) => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);

  // Ref to canvas/container element for calculating absolute cursor positions
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!socket) return;

    // Listen for updates about other users' cursors/selections
    const handleUpdate = (data: { collaborators: Collaborator[] }) => {
      setCollaborators(data.collaborators.filter(c => c.id !== socket.id));
    };

    socket.on("collab:update", handleUpdate);

    // Cleanup on unmount
    return () => {
      socket.off("collab:update", handleUpdate);
    };
  }, [socket]);

  // Convert normalized cursor positions to absolute pixels
  const getCursorStyle = (cursorX: number, cursorY: number) => {
    if (!containerRef.current) return { left: 0, top: 0 };
    const rect = containerRef.current.getBoundingClientRect();

    return {
      left: rect.left + cursorX * rect.width,
      top: rect.top + cursorY * rect.height,
    };
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    >
      {collaborators.map(({ id, name, color, cursorX, cursorY, selectionRect }) => {
        const cursorPos = getCursorStyle(cursorX, cursorY);

        return (
          <React.Fragment key={id}>
            {/* Cursor */}
            <div
              className="absolute w-4 h-4 rounded-full border-2 border-white"
              style={{
                backgroundColor: color,
                left: cursorPos.left,
                top: cursorPos.top,
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                boxShadow: `0 0 8px ${color}`,
                zIndex: 10000,
              }}
              title={name}
            />

            {/* Selection Rectangle */}
            {selectionRect && containerRef.current && (
              <div
                className="absolute border-2 border-dashed"
                style={{
                  left: containerRef.current.getBoundingClientRect().left + selectionRect.x,
                  top: containerRef.current.getBoundingClientRect().top + selectionRect.y,
                  width: selectionRect.width,
                  height: selectionRect.height,
                  borderColor: color,
                  pointerEvents: "none",
                  zIndex: 9999,
                }}
              />
            )}

            {/* User Label */}
            <div
              className="absolute text-xs font-semibold select-none"
              style={{
                left: cursorPos.left,
                top: cursorPos.top - 18,
                color,
                transform: "translateX(-50%)",
                textShadow: "0 0 4px rgba(0,0,0,0.6)",
                pointerEvents: "none",
                zIndex: 10001,
              }}
            >
              {name}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default RealtimeCollabOverlay;
