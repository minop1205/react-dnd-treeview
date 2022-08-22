import { NodeModel } from "~/types";

export const getDestIndex = (
  tree: NodeModel[],
  dropTargetId: NodeModel["id"],
  index: number
) => {
  if (index === 0) {
    return 0;
  }

  const siblings = tree.filter((node) => node.parent === dropTargetId);

  if (siblings[index]) {
    return tree.findIndex((node) => node.id === siblings[index].id);
  }

  return tree.findIndex((node) => node.id === siblings[index - 1].id) + 1;
};
