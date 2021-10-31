import { produce } from "immer";
import { NodeModel } from "../types";

export const mutateTree = <T>(
  tree: NodeModel<T>[],
  dragSourceId: NodeModel["id"],
  dropTargetId: NodeModel["id"]
): NodeModel<T>[] =>
  produce(tree, (draft) => {
    draft.forEach((node) => {
      if (node.id === dragSourceId) {
        node.parent = dropTargetId;
      }
    });
  });
