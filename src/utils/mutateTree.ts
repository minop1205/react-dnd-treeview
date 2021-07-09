import { produce } from "immer";
import { NodeModel } from "../types";

export const mutateTree = (
  tree: NodeModel[],
  id: NodeModel["id"],
  parentId: NodeModel["id"]
): NodeModel[] =>
  produce(tree, (draft) => {
    draft.forEach((node) => {
      if (node.id === id) {
        node.parent = parentId;
      }
    });
  });
