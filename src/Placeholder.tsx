import React, { useContext, ReactElement } from "react";
import { useDragDropManager } from "react-dnd";
import { useTreeContext } from "./hooks";
import { NodeModel } from "./types";
import { PlaceholderContext } from "./providers";

type Props = {
  depth: number;
  listCount: number;
  parentId: NodeModel["id"];
  index?: number;
};

export const Placeholder = <T extends unknown>(
  props: Props
): ReactElement | null => {
  const { placeholderRender, classes } = useTreeContext<T>();
  const placeholderContext = useContext(PlaceholderContext);
  const manager = useDragDropManager();
  const monitor = manager.getMonitor();
  const dragSource = monitor.getItem() as NodeModel<T> | null;

  if (!placeholderRender || !dragSource) {
    return null;
  }

  const visible =
    placeholderContext.visible &&
    props.parentId === placeholderContext.parentId &&
    (props.index === placeholderContext.index ||
      (props.index === undefined &&
        props.listCount === placeholderContext.index));

  if (!visible) {
    return null;
  }

  return (
    <div className={classes?.placeholder || ""}>
      {placeholderRender(dragSource, { depth: props.depth })}
    </div>
  );
};
