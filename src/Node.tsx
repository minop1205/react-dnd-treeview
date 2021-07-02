import React, { useEffect, useRef, useContext, useCallback } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import { Container } from "./Container";
import { useDragNode, useDropNode, useDragControl } from "./hooks";
import { NodeModel, RenderParams } from "./types";
import { TreeContext } from "./Tree";

type Props = {
  id: NodeModel["id"];
  depth: number;
};

export const Node: React.FC<Props> = (props) => {
  const context = useContext(TreeContext);
  const ref = useRef<HTMLLIElement>(null);
  const item = context.tree.find((node) => node.id === props.id);
  const { openIds, classes } = context;
  const open = openIds.includes(props.id);

  if (!item) {
    return null;
  }

  const [isDragging, drag, preview] = useDragNode(item, ref);
  const [isOver, drop] = useDropNode(item);

  drag(ref);

  if (item.droppable || context.canDrop) {
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

  let className = "";

  if (isOver && classes?.dropTarget) {
    className = classes.dropTarget;
  }

  if (isDragging && classes?.draggingSource) {
    className = `${className} ${classes.draggingSource}`;
  }

  const params: RenderParams = {
    depth: props.depth,
    isOpen: open,
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
