import { NodeModel } from "~/types";

export const getTreeItem = <T>(
  tree: NodeModel<T>[],
  id: NodeModel["id"]
): NodeModel<T> | undefined => tree.find((n) => n.id === id);
