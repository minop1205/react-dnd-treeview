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

  let groups = nodes.filter((n) => n.droppable);
  let templates = nodes.filter((n) => !n.droppable);

  if (context.sort !== false) {
    const sortCallback =
      typeof context.sort === "function" ? context.sort : compareItems;
    groups = groups.sort(sortCallback);
    templates = templates.sort(sortCallback);
  }

  const view = [...groups, ...templates];
  const [isOver, drop] = useDropContainer(props.parentId, context.tree, context.onDrop, context.canDrop);
  const classes = context.classes;

  let className = "";

  if (classes?.container) {
    className = classes.container;
  }

  if (isOver && classes?.dropTarget) {
    className = `${className} ${classes.dropTarget}`;
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
