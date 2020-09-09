import { NodeModel } from "./types";

export const mutateTree = (
  tree: NodeModel[],
  id: NodeModel["id"],
  parentId: NodeModel["id"]
): NodeModel[] =>
  tree.map((node) => {
    if (node.id === id) {
      return {
        ...node,
        parent: parentId,
      };
    }

    return node;
  });

export const compareItems = (a: NodeModel, b: NodeModel): number => {
  if (a.name > b.name) {
    return 1;
  } else if (a.name < b.name) {
    return -1;
  }

  return 0;
};
