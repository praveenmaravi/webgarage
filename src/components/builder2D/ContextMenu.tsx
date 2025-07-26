// src/components/builder2D/ContextMenu.tsx
import React, { useEffect, useRef, useState } from "react";
import { useBuilder2DStore } from "./useBuilder2DStore";

interface ContextMenuProps {
  targetId: string | null;
  position: { x: number; y: number };
  onClose: () => void;
}

const menuOptions = [
  { label: "Bring to Front", action: "bringToFront" },
  { label: "Send to Back", action: "sendToBack" },
  { label: "Duplicate", action: "duplicate" },
  { label: "Delete", action: "delete" },
];

const ContextMenu: React.FC<ContextMenuProps> = ({
  targetId,
  position,
  onClose,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const {
    deleteElement,
    duplicateElement,
    bringToFront,
    sendToBack,
  } = useBuilder2DStore();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleAction = (action: string) => {
    if (!targetId) return;
    switch (action) {
      case "delete":
        deleteElement(targetId);
        break;
      case "duplicate":
        duplicateElement(targetId);
        break;
      case "bringToFront":
        bringToFront(targetId);
        break;
      case "sendToBack":
        sendToBack(targetId);
        break;
    }
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="absolute z-50 bg-white border border-gray-300 rounded shadow-md"
      style={{ top: position.y, left: position.x }}
    >
      {menuOptions.map((option) => (
        <div
          key={option.action}
          onClick={() => handleAction(option.action)}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default ContextMenu;
