import React, { ReactElement } from "react";
import { useTreeContext, useTreeDragLayer } from "./hooks";
import { DragLayerMonitorProps } from "./types";

const rootStyle: React.CSSProperties = {
  height: "100%",
  left: 0,
  pointerEvents: "none",
  position: "fixed",
  top: 0,
  width: "100%",
  zIndex: 100,
};

const getItemStyles = <T,>(
  monitorProps: DragLayerMonitorProps<T>
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

export const DragLayer = <T,>(): ReactElement | null => {
  const context = useTreeContext<T>();
  const monitorProps = useTreeDragLayer<T>();
  const { isDragging, clientOffset } = monitorProps;

  if (!isDragging || !clientOffset) {
    return null;
  }

  return (
    <div style={rootStyle}>
      <div style={getItemStyles<T>(monitorProps)}>
        {context.dragPreviewRender && context.dragPreviewRender(monitorProps)}
      </div>
    </div>
  );
};
