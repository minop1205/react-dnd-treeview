import { isAncestor } from "./isAncestor";
import { NodeModel, TreeState } from "../types";

export const isDroppable = (
  dragSourceId: NodeModel["id"],
  dropTargetId: NodeModel["id"],
  treeContext: TreeState
): boolean => {
  const { tree, rootId, canDrop } = treeContext;

  if (canDrop) {
    const result = canDrop(dragSourceId, dropTargetId);

    if (result !== undefined) {
      return result;
    }
  }

  if (dragSourceId === dropTargetId) {
    return false;
  }

  if (dropTargetId === rootId) {
    return true;
  }

  const dragSourceNode = tree.find((node) => node.id === dropTargetId);
  const dropTargetNode = tree.find((node) => node.id === dropTargetId);

  if (dropTargetNode === undefined || !dropTargetNode.droppable) {
    return false;
  }

  if (dragSourceNode === undefined || dragSourceNode.parent === dropTargetId) {
    return false;
  }

  return !isAncestor(tree, dragSourceId, dropTargetId);
};
