import React, {
  useEffect,
  useRef,
  useCallback,
  PropsWithChildren,
  ReactElement,
} from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import { Container } from "./Container";
import {
  useTreeContext,
  useDragNode,
  useDropNode,
  useDragControl,
} from "./hooks";
import { NodeModel, RenderParams } from "./types";
import { isDroppable } from "./utils";

type Props = PropsWithChildren<{
  id: NodeModel["id"];
  depth: number;
}>;

export const Node = <T extends unknown>(props: Props): ReactElement | null => {
  const context = useTreeContext<T>();
  const ref = useRef<HTMLElement>(null);
  const item = context.tree.find((node) => node.id === props.id);
  const { openIds, classes } = context;
  const open = openIds.includes(props.id);

  if (!item) {
    return null;
  }

  const [isDragging, drag, preview] = useDragNode(item, ref);
  const [isOver, dragSource, drop] = useDropNode(item, ref);

  drag(ref);

  if (isDroppable(dragSource?.id, props.id, context)) {
    drop(ref);
  }

  const hasChild = !!context.tree.find((node) => node.parent === props.id);

  useEffect(() => {
    if (context.dragPreviewRender) {
      preview(getEmptyImage(), { captureDraggingState: true });
    }
  }, []);

  useDragControl(ref);

  const handleToggle = useCallback(() => {
    context.onToggle(item.id);
  }, [openIds]);

  const Component = context.listItemComponent;

  let className = classes?.listItem || "";

  if (isOver && classes?.dropTarget) {
    className = `${className} ${classes.dropTarget}`;
  }

  if (isDragging && classes?.draggingSource) {
    className = `${className} ${classes.draggingSource}`;
  }

  const draggable = context.canDrag ? context.canDrag(props.id) : true;

  const params: RenderParams = {
    depth: props.depth,
    isOpen: open,
    draggable,
    hasChild,
    onToggle: handleToggle,
  };

  return (
    <Component ref={ref} className={className} role="listitem">
      {context.render(item, params)}
      {open && hasChild && (
        <Container parentId={props.id} depth={props.depth + 1} />
      )}
    </Component>
  );
};
