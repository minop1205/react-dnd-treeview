import { NodeModel } from "~/types";

export const isAncestor = (
  tree: NodeModel[],
  sourceId: NodeModel["id"],
  targetId: NodeModel["id"]
): boolean => {
  if (targetId === 0) {
    return false;
  }

  const targetNode = tree.find((node) => node.id === targetId);

  if (targetNode === undefined) {
    return false;
  }

  if (targetNode.parent === sourceId) {
    return true;
  }

  return isAncestor(tree, sourceId, targetNode.parent);
};
