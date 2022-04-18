import { NodeModel } from "~/types";

export const mutateTree = <T>(
  tree: NodeModel<T>[],
  dragSourceId: NodeModel["id"],
  dropTargetId: NodeModel["id"]
): NodeModel<T>[] =>
  tree.map((node) => {
    if (node.id === dragSourceId) {
      return {
        ...node,
        parent: dropTargetId,
      };
    }

    return node;
  });
