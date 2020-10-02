import React, { useContext } from "react";
import { Node } from "./Node";
import { NodeModel } from "./types";
import { useDropContainer } from "./hooks";
import { compareItems } from "./utils";
import { Context } from "./Tree";

type Props = {
  parentId: NodeModel["id"];
  depth: number;
};

export const Container: React.FC<Props> = (props) => {
  const context = useContext(Context);
  const nodes = context.tree.filter((l) => l.parent === props.parentId);
  const groups = nodes.filter((n) => n.droppable).sort(compareItems);
  const templates = nodes.filter((n) => !n.droppable).sort(compareItems);
  const view = [...groups, ...templates];
  const [isOver, drop] = useDropContainer(context.tree, context.onDrop);
  const classes = context.classes;

  let className = "";

  if (classes?.container) {
    className = classes.container;
  }

  if (isOver && classes?.dragOver) {
    className = `${className} ${classes.dragOver}`;
  }

  if (props.parentId === 0 && classes?.root) {
    className = `${className} ${classes.root}`;
  }

  const Component = context.listComponent || "ul";

  return (
    <Component
      ref={props.parentId === 0 ? drop : undefined}
      className={className}
    >
      {view.map((node) => (
        <Node key={node.id} id={node.id} depth={props.depth} />
      ))}
    </Component>
  );
};
