import React, { useRef, PropsWithChildren, ReactElement } from "react";
import { Node } from "./Node";
import { Placeholder } from "./Placeholder";
import { NodeModel } from "./types";
import { useTreeContext, useDropRoot } from "./hooks";
import { compareItems, isDroppable } from "./utils";

type Props = PropsWithChildren<{
  parentId: NodeModel["id"];
  depth: number;
}>;

export const Container = <T extends unknown>(props: Props): ReactElement => {
  const treeContext = useTreeContext<T>();
  const ref = useRef<HTMLLIElement>(null);
  const nodes = treeContext.tree.filter((l) => l.parent === props.parentId);

  let groups = nodes.filter((n) => n.droppable);
  let templates = nodes.filter((n) => !n.droppable);

  if (treeContext.sort !== false) {
    const sortCallback =
      typeof treeContext.sort === "function" ? treeContext.sort : compareItems;
    groups = groups.sort(sortCallback);
    templates = templates.sort(sortCallback);
  }

  const view = [...groups, ...templates];
  const [isOver, dragSource, drop] = useDropRoot(ref);
  const classes = treeContext.classes;

  if (
    props.parentId === treeContext.rootId &&
    isDroppable(dragSource?.id, treeContext.rootId, treeContext)
  ) {
    drop(ref);
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

  const Component = treeContext.listComponent;

  return (
    <Component ref={ref} className={className} role="list">
      {view.map((node, index) => (
        <React.Fragment key={index}>
          <Placeholder
            depth={props.depth}
            listCount={view.length}
            parentId={props.parentId}
            index={index}
          />
          <Node id={node.id} depth={props.depth} />
        </React.Fragment>
      ))}
      <Placeholder
        depth={props.depth}
        listCount={view.length}
        parentId={props.parentId}
      />
    </Component>
  );
};
