import { NodeModel } from "~/types";

export const hasChildNodes = (
  tree: NodeModel[],
  nodeId: NodeModel["id"]
): boolean => {
  return tree.some((node) => node.parent === nodeId);
};
