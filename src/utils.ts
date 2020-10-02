import { produce } from "immer";
import { NodeModel } from "./types";

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

export const compareItems = (a: NodeModel, b: NodeModel): number => {
  if (a.text > b.text) {
    return 1;
  } else if (a.text < b.text) {
    return -1;
  }

  return 0;
};
