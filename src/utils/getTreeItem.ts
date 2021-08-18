import { produce } from "immer";
import { NodeModel } from "../types";

export const getTreeItem = <T>(
  tree: NodeModel<T>[],
  id: NodeModel["id"]
): NodeModel<T> | undefined => {
  const node = tree.find((n) => n.id === id);

  if (!node) {
    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return produce(node, () => {});
};
