import { produce } from "immer";
import { NodeModel } from "../types";

export const getTreeItem = (
  tree: NodeModel[],
  id: NodeModel["id"]
): NodeModel | undefined => {
  const node = tree.find((n) => n.id === id);

  if (!node) {
    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return produce(node, () => {});
};
