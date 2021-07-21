import React, { useImperativeHandle } from "react";
import { mutateTree, getTreeItem } from "../utils";
import { useOpenIdsHelper } from "../hooks";
import { TreeState, OpenIdsHandlers, TreeProps } from "../types";

type Props = TreeProps & {
  treeRef: React.ForwardedRef<OpenIdsHandlers>;
};

export const TreeContext = React.createContext<TreeState>({} as TreeState);

export const TreeProvider: React.FC<Props> = (props) => {
  const [openIds, { handleToggle, handleCloseAll, handleOpenAll }] =
    useOpenIdsHelper(props.tree, props.initialOpen);

  useImperativeHandle(props.treeRef, () => ({
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
      {props.children}
    </TreeContext.Provider>
  );
};
