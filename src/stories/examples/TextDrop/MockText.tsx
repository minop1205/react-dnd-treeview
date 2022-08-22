import React from "react";

export const MockText: React.FC = () => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text", "mock text");
  };

  return (
    <p
      draggable
      style={{ display: "none" }}
      data-testid="mock-text"
      onDragStart={handleDragStart}
    >
      mock text
    </p>
  );
};
