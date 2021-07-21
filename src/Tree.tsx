import React, { createContext, forwardRef, useImperativeHandle } from "react";
import { DndProvider } from "react-dnd-multi-backend";
import { DragControlProvider } from "./providers/DragControlProvider";
import { PlaceholderProvider } from "./providers/PlaceholderProvider";
import HTML5toTouch from "react-dnd-multi-backend/dist/cjs/HTML5toTouch";
import { DragLayer } from "./DragLayer";
import { Container } from "./Container";
import { mutateTree, getTreeItem } from "./utils";
import { useOpenIdsHelper } from "./hooks";
import { TreeState, OpenIdsHandlers, TreeProps } from "./types";

const TreeContext = createContext<TreeState>({} as TreeState);

const Tree = forwardRef<OpenIdsHandlers, TreeProps>((props, ref) => {
  const [openIds, { handleToggle, handleCloseAll, handleOpenAll }] =
    useOpenIdsHelper(props.tree, props.initialOpen);

  useImperativeHandle(ref, () => ({
    openAll: () => handleOpenAll(),
    closeAll: () => handleCloseAll(),
  }));

  const canDropCallback = props.canDrop;
  const canDragCallback = props.canDrag;

  return (
    <TreeContext.Provider
      value={{
        listComponent: "ul",
        listItemComponent: "li",
        sort: true,
        initialOpen: false,
        ...props,
        openIds,
        onDrop: (id, parentId) =>
          props.onDrop(mutateTree(props.tree, id, parentId), {
            dragSourceId: id,
            dropTargetId: parentId,
            dragSource: getTreeItem(props.tree, id),
            dropTarget: getTreeItem(props.tree, parentId),
          }),
        canDrop: canDropCallback
          ? (id, parentId) =>
              canDropCallback(props.tree, {
                dragSourceId: id,
                dropTargetId: parentId,
                dragSource: getTreeItem(props.tree, id),
                dropTarget: getTreeItem(props.tree, parentId),
              })
          : undefined,
        canDrag: canDragCallback
          ? (id) => canDragCallback(getTreeItem(props.tree, id))
          : undefined,
        onToggle: handleToggle,
      }}
    >
      <DragControlProvider>
        <PlaceholderProvider>
          <DndProvider options={HTML5toTouch}>
            {props.dragPreviewRender && <DragLayer />}
            <Container parentId={props.rootId} depth={0} />
          </DndProvider>
        </PlaceholderProvider>
      </DragControlProvider>
    </TreeContext.Provider>
  );
});

Tree.displayName = "Tree";

export { TreeContext, Tree };
