import React, { createContext, forwardRef, useImperativeHandle } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DragLayer } from "./DragLayer";
import { Container } from "./Container";
import { mutateTree, getTreeItem } from "./utils";
import { useOpenIdsHelper } from "./hooks";
import {
  NodeModel,
  NodeRender,
  DragPreviewRender,
  TreeContext,
  OpenIdsHandlers,
  SortCallback,
  InitialOpen,
} from "./types";

type Props = {
  tree: NodeModel[];
  rootId: NodeModel["id"];
  classes?: TreeContext["classes"];
  listComponent?: TreeContext["listComponent"];
  listItemComponent?: TreeContext["listItemComponent"];
  render: NodeRender;
  dragPreviewRender?: DragPreviewRender;
  onDrop: (
    tree: NodeModel[],
    options: {
      dragSourceId: NodeModel["id"];
      dropTargetId: NodeModel["id"];
      dragSource: NodeModel | undefined;
      dropTarget: NodeModel | undefined;
    }
  ) => void;
  sort?: SortCallback | boolean;
  initialOpen?: InitialOpen;
};

const Context = createContext<TreeContext>({} as TreeContext);

const Tree = forwardRef<OpenIdsHandlers, Props>((props, ref) => {
  const [
    openIds,
    { handleToggle, handleCloseAll, handleOpenAll },
  ] = useOpenIdsHelper(props.tree, props.initialOpen);

  useImperativeHandle(ref, () => ({
    openAll: () => handleOpenAll(),
    closeAll: () => handleCloseAll(),
  }));

  return (
    <Context.Provider
      value={{
        ...props,
        openIds,
        onDrop: (id, parentId) =>
          props.onDrop(mutateTree(props.tree, id, parentId), {
            dragSourceId: id,
            dropTargetId: parentId,
            dragSource: getTreeItem(props.tree, id),
            dropTarget: getTreeItem(props.tree, parentId),
          }),
        onToggle: handleToggle,
        sort: props.sort,
      }}
    >
      <DndProvider backend={HTML5Backend}>
        {props.dragPreviewRender && <DragLayer />}
        <Container parentId={props.rootId} depth={0} />
      </DndProvider>
    </Context.Provider>
  );
});

Tree.displayName = "Tree";

export { Context, Tree };
