import { isAncestor } from "./isAncestor";
import { NodeModel } from "../types";

export const isDroppable = (
  tree: NodeModel[],
  sourceId: NodeModel["id"],
  targetId: NodeModel["id"]
): boolean => {
  if (sourceId === targetId) {
    return false;
  }

  const sourceNode = tree.find((node) => node.id === sourceId);

  if (sourceNode === undefined || sourceNode.parent === targetId) {
    return false;
  }

  return !isAncestor(tree, sourceId, targetId);
};
