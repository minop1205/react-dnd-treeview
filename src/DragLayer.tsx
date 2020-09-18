import React, { useContext } from "react";
import { useTreeDragLayer } from "./hooks";
import { DragLayerMonitorProps } from "./types";
import { Context } from "./Tree";

const rootStyle: React.CSSProperties = {
  height: "100%",
  left: 0,
  pointerEvents: "none",
  position: "fixed",
  top: 0,
  width: "100%",
  zIndex: 100,
};

const getItemStyles = (
  monitorProps: DragLayerMonitorProps
): React.CSSProperties => {
  const offset = monitorProps.clientOffset;

  if (!offset) {
    return {};
  }

  const { x, y } = offset;
  const transform = `translate(${x}px, ${y}px)`;

  return {
    pointerEvents: "none",
    transform,
  };
};

export const DragLayer: React.FC = () => {
  const context = useContext(Context);
  const monitorProps = useTreeDragLayer();

  if (!monitorProps.isDragging) {
    return null;
  }

  return (
    <div style={rootStyle}>
      <div style={getItemStyles(monitorProps)}>
        {context.dragPreviewRender(monitorProps)}
      </div>
    </div>
  );
};
