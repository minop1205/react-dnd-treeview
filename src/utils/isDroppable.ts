import { isAncestor } from "./isAncestor";
import { NodeModel, NativeDragItem, TreeState } from "~/types";
import { isNodeModel } from "./isNodeModel";

export const isDroppable = <T>(
  dragSource: NodeModel<T> | NativeDragItem | null,
  dropTargetId: NodeModel["id"],
  treeContext: TreeState<T>,
  index: number | null
): boolean => {
  const { tree, rootId, canDrop } = treeContext;

  if (dragSource === null) {
    // Dropability judgment of each node in the undragged state.
    // Without this process, the newly mounted node will not be able to be dropped unless it is re-rendered
    if (dropTargetId === rootId) {
      return true;
    }

    const dropTargetNode = tree.find((node) => node.id === dropTargetId);

    if (dropTargetNode && dropTargetNode.droppable) {
      return true;
    }

    return false;
  } else {
    const dragSourceId = isNodeModel<T>(dragSource) ? dragSource.id : null;

    if (canDrop) {
      const result = canDrop(dragSourceId, dropTargetId, index);
      if (result !== undefined) {
        return result;
      }
    }

    if (dragSourceId === dropTargetId) {
      return false;
    }

    const dragSourceNode = tree.find((node) => node.id === dragSourceId);
    const dropTargetNode = tree.find((node) => node.id === dropTargetId);

    // dragSource is external node
    if (dragSourceNode === undefined || dragSourceId === null) {
      return dropTargetId === rootId || !!dropTargetNode?.droppable;
    }

    // dropTarget is root node
    if (dropTargetNode === undefined) {
      return dragSourceNode.parent !== 0;
    }

    if (dragSourceNode.parent === dropTargetId || !dropTargetNode.droppable) {
      return false;
    }

    return !isAncestor(tree, dragSourceId, dropTargetId);
  }
};
