import React from "react";
import { useBuilder2DStore } from "./useBuilder2DStore";
import ElementDragger from "./ElementDragger";
import ElementResizer from "./ElementResizer";

type ElementProps = {
  id: string;
  type: "text" | "rectangle" | "image";
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  src?: string;
  selected?: boolean;
};

const ElementRenderer: React.FC<{ element: ElementProps }> = ({ element }) => {
  const { id, type, x, y, width, height, content, src, selected } = element;
  const updateElement = useBuilder2DStore((state) => state.updateElement);

  const style: React.CSSProperties = {
    position: "absolute",
    top: y,
    left: x,
    width,
    height,
    userSelect: "none",
    cursor: "move",
    border: selected ? "2px solid #2563eb" : "1px solid #ccc",
    boxSizing: "border-box",
    padding: type === "text" ? "4px" : 0,
    backgroundColor: type === "rectangle" ? "#f9fafb" : "transparent",
    overflow: "hidden",
  };

  const handleResize = (newSize: { width: number; height: number }) => {
    updateElement(id, newSize);
  };

  return (
    <ElementDragger id={id}>
      <div style={style}>
        {type === "text" && (
          <div
            style={{
              fontSize: 16,
              color: "#111827",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            {content}
          </div>
        )}

        {type === "rectangle" && null}

        {type === "image" && src && (
          <img
            src={src}
            alt="Element"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}

        {selected && (
          <ElementResizer
            id={id}
            width={width}
            height={height}
            onResize={handleResize}
          />
        )}
      </div>
    </ElementDragger>
  );
};

export default ElementRenderer;
