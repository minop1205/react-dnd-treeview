import { NodeModel } from "~/types";

export const hasChildNodes = (
  tree: NodeModel[],
  nodeId: NodeModel["id"]
): boolean => {
  return (
    tree.find((node) => node.id === nodeId)?.hasChildren ||
    tree.some((node) => node.parent === nodeId)
  );
};
