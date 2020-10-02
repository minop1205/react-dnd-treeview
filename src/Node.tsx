import React, { useEffect, useRef, useContext } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import { Container } from "./Container";
import { useDragNode, useDropNode } from "./hooks";
import { NodeModel } from "./types";
import { Context } from "./Tree";

type Props = {
  id: NodeModel["id"];
  depth: number;
};

export const Node: React.FC<Props> = (props) => {
  const context = useContext(Context);
  const ref = useRef<HTMLLIElement>(null);
  const item = context.tree.find((node) => node.id === props.id);
  const open = context.openIds.includes(props.id);

  if (!item) {
    return null;
  }

  const [isDragging, drag, preview] = useDragNode(item, ref);
  const [isOver, drop] = useDropNode(props.id, context.tree, context.onDrop);

  if (item.droppable) {
    drop(drag(ref));
  } else {
    drag(ref);
  }

  const hasChild = !!context.tree.find((node) => node.parent === props.id);

  useEffect(() => {
    if (context.dragPreviewRender) {
      preview(getEmptyImage(), { captureDraggingState: true });
    }
  }, []);

  const Component = context.listItemComponent || "li";

  return (
    <Component
      ref={ref}
      style={{
        background: isOver ? "#fee" : "none",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {context.render(item, props.depth, open, context.onToggle)}
      {open && hasChild && (
        <Container parentId={props.id} depth={props.depth + 1} />
      )}
    </Component>
  );
};
