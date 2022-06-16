import React from "react";
import { useDragLayer } from "react-dnd";
import { DragLayerMonitorProps } from "~/types";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";

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

export const DragLayer: React.FC = () => {
  const monitorProps = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    clientOffset: monitor.getClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  const { isDragging, clientOffset } = monitorProps;

  if (!isDragging || !clientOffset) {
    return null;
  }

  return (
    <div style={rootStyle}>
      <div style={getItemStyles(monitorProps)}>
        <CustomDragPreview monitorProps={monitorProps} />
      </div>
    </div>
  );
};
