import { produce } from "immer";
import { NodeModel } from "../types";

export const mutateTree = <T>(
  tree: NodeModel<T>[],
  id: NodeModel["id"],
  parentId: NodeModel["id"]
): NodeModel<T>[] =>
  produce(tree, (draft) => {
    draft.forEach((node) => {
      if (node.id === id) {
        node.parent = parentId;
      }
    });
  });
