import React, { useRef, PropsWithChildren, ReactElement } from "react";
import { Node } from "./Node";
import { Placeholder } from "./Placeholder";
import { NodeModel } from "./types";
import { useTreeContext, useDropRoot, useContainerClassName } from "./hooks";
import { compareItems, isDroppable } from "./utils";

type Props = PropsWithChildren<{
  parentId: NodeModel["id"];
  depth: number;
}>;

export const Container = <T,>(props: Props): ReactElement => {
  const treeContext = useTreeContext<T>();
  const ref = useRef<HTMLLIElement>(null);
  const nodes = treeContext.tree.filter((l) => l.parent === props.parentId);

  let view = nodes;
  const sortCallback =
    typeof treeContext.sort === "function" ? treeContext.sort : compareItems;

  if (treeContext.insertDroppableFirst) {
    let droppableNodes = nodes.filter((n) => n.droppable);
    let nonDroppableNodes = nodes.filter((n) => !n.droppable);

    if (treeContext.sort === false) {
      view = [...droppableNodes, ...nonDroppableNodes];
    } else {
      droppableNodes = droppableNodes.sort(sortCallback);
      nonDroppableNodes = nonDroppableNodes.sort(sortCallback);
      view = [...droppableNodes, ...nonDroppableNodes];
    }
  } else {
    if (treeContext.sort !== false) {
      view = nodes.sort(sortCallback);
    }
  }

  const [isOver, dragSource, drop] = useDropRoot(ref);

  if (
    props.parentId === treeContext.rootId &&
    isDroppable(dragSource?.id, treeContext.rootId, treeContext)
  ) {
    drop(ref);
  }

  const className = useContainerClassName(props.parentId, isOver);
  const rootProps = treeContext.rootProps || {};
  const Component = treeContext.listComponent;

  return (
    <Component ref={ref} role="list" {...rootProps} className={className}>
      {view.map((node, index) => (
        <React.Fragment key={node.id}>
          <Placeholder
            depth={props.depth}
            listCount={view.length}
            dropTargetId={props.parentId}
            index={index}
          />
          <Node id={node.id} depth={props.depth} />
        </React.Fragment>
      ))}
      <Placeholder
        depth={props.depth}
        listCount={view.length}
        dropTargetId={props.parentId}
      />
    </Component>
  );
};
