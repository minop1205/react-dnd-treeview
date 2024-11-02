import React, { useContext } from "react";
import { useDragDropManager } from "react-dnd";
import { useTreeContext } from "./hooks";
import { PlaceholderContext } from "./providers";
import type { NodeModel } from "./types";
import type { ReactElement } from "react";

type Props = {
  depth: number;
  listCount: number;
  dropTargetId: NodeModel["id"];
  index?: number;
};

export const Placeholder = <T,>(props: Props): ReactElement | null => {
  const {
    placeholderRender,
    placeholderComponent: Component,
    classes,
  } = useTreeContext<T>();
  const placeholderContext = useContext(PlaceholderContext);
  const manager = useDragDropManager();
  const monitor = manager.getMonitor();
  const dragSource = monitor.getItem() as NodeModel<T> | null;

  if (!placeholderRender || !dragSource) {
    return null;
  }

  const visible =
    props.dropTargetId === placeholderContext.dropTargetId &&
    (props.index === placeholderContext.index ||
      (props.index === undefined &&
        props.listCount === placeholderContext.index));

  const targetIds = monitor.getTargetIds();

  if (!visible || !targetIds.length) {
    return null;
  }

  return (
    <Component className={classes?.placeholder || ""}>
      {placeholderRender(dragSource, { depth: props.depth })}
    </Component>
  );
};
