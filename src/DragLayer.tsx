import React, { useContext } from "react";
import { useTreeDragLayer } from "./hooks";
import { makeStyles } from "@material-ui/styles";
import { DragLayerMonitorProps } from "./types";
import { Context } from "./Tree";

const useStyles = makeStyles({
  root: {
    height: "100%",
    left: 0,
    pointerEvents: "none",
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 100,
  },
  container: {
    pointerEvents: "none",
  },
});

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
    transform,
  };
};

export const DragLayer: React.FC = () => {
  const context = useContext(Context);
  const classes = useStyles();
  const monitorProps = useTreeDragLayer();

  if (!monitorProps.isDragging) {
    return null;
  }

  return (
    <div className={classes.root}>
      <div className={classes.container} style={getItemStyles(monitorProps)}>
        {context.dragPreviewRender(monitorProps)}
      </div>
    </div>
  );
};
