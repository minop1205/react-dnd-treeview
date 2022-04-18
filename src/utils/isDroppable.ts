import { isAncestor } from "./isAncestor";
import { NodeModel, TreeState } from "~/types";

export const isDroppable = <T>(
  dragSourceId: NodeModel["id"],
  dropTargetId: NodeModel["id"],
  treeContext: TreeState<T>
): boolean => {
  const { tree, rootId, canDrop } = treeContext;

  if (dragSourceId === undefined) {
    if (dropTargetId === rootId) {
      return true;
    }

    const dropTargetNode = tree.find((node) => node.id === dropTargetId);

    if (dropTargetNode && dropTargetNode.droppable) {
      return true;
    }

    return false;
  } else {
    if (canDrop) {
      const result = canDrop(dragSourceId, dropTargetId);

      if (result !== undefined) {
        return result;
      }
    }

    if (dragSourceId === dropTargetId) {
      return false;
    }

    const dragSourceNode = tree.find((node) => node.id === dragSourceId);

    if (
      dragSourceNode === undefined ||
      dragSourceNode.parent === dropTargetId
    ) {
      return false;
    }

    if (dropTargetId === rootId) {
      return true;
    }

    const dropTargetNode = tree.find((node) => node.id === dropTargetId);

    if (dropTargetNode === undefined || !dropTargetNode.droppable) {
      return false;
    }

    return !isAncestor(tree, dragSourceId, dropTargetId);
  }
};
