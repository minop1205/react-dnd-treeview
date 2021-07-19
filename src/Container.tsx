import React, { useRef, useContext } from "react";
import { Node } from "./Node";
import { NodeModel } from "./types";
import { useDropContainer } from "./hooks";
import { compareItems } from "./utils";
import { TreeContext } from "./Tree";

type Props = {
  parentId: NodeModel["id"];
  depth: number;
};

export const Container: React.FC<Props> = (props) => {
  const context = useContext(TreeContext);
  const ref = useRef<HTMLLIElement>(null);
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
  const [isOver, dragSource, drop] = useDropContainer(props.parentId, ref);
  const classes = context.classes;

  if (props.parentId === context.rootId) {
    if (context.canDrop && dragSource) {
      const result = context.canDrop(dragSource.id, context.rootId);

      if (result || result === undefined) {
        drop(ref);
      }
    } else {
      drop(ref);
    }
  }

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

  const Component = context.listComponent;

  return (
    <Component ref={ref} className={className} role="list">
      {view.map((node) => (
        <Node key={node.id} id={node.id} depth={props.depth} />
      ))}
    </Component>
  );
};
