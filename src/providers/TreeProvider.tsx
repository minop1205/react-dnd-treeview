import React, {
  useImperativeHandle,
  PropsWithChildren,
  ReactElement,
} from "react";
import { mutateTree, getTreeItem } from "../utils";
import { useOpenIdsHelper } from "../hooks";
import { NodeModel, TreeState, OpenIdsHandlers, TreeProps } from "../types";

type Props<T> = PropsWithChildren<
  TreeProps<T> & {
    treeRef: React.ForwardedRef<OpenIdsHandlers>;
  }
>;

export const TreeContext = React.createContext({});

export const TreeProvider = <T extends unknown>(
  props: Props<T>
): ReactElement => {
  const [openIds, { handleToggle, handleCloseAll, handleOpenAll, handleOpen }] =
    useOpenIdsHelper(props.tree, props.initialOpen);

  useImperativeHandle(props.treeRef, () => ({
    open: (targetIds: NodeModel["id"] | NodeModel["id"][]) =>
      handleOpen(targetIds),
    openAll: () => handleOpenAll(),
    closeAll: () => handleCloseAll(),
  }));

  const canDropCallback = props.canDrop;
  const canDragCallback = props.canDrag;

  const value: TreeState<T> = {
    listComponent: "ul",
    listItemComponent: "li",
    placeholderComponent: "li",
    sort: true,
    insertDroppableFirst: true,
    dropTargetOffset: 0,
    initialOpen: false,
    ...props,
    openIds,
    onDrop: (id, parentId, index) =>
      props.onDrop(mutateTree<T>(props.tree, id, parentId, index), {
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
  };

  return (
    <TreeContext.Provider value={value}>{props.children}</TreeContext.Provider>
  );
};
