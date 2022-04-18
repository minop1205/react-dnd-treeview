import { NodeModel } from "~/types";

const getSrcIndex = (tree: NodeModel[], dragSourceId: NodeModel["id"]) => {
  return tree.findIndex((node) => node.id === dragSourceId);
};

const getDestIndex = (
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

export const getModifiedIndex = (
  tree: NodeModel[],
  dragSourceId: NodeModel["id"],
  dropTargetId: NodeModel["id"],
  index: number
): [number, number] => {
  const srcIndex = getSrcIndex(tree, dragSourceId);
  let destIndex = getDestIndex(tree, dropTargetId, index);
  destIndex = destIndex > srcIndex ? destIndex - 1 : destIndex;

  return [srcIndex, destIndex];
};
