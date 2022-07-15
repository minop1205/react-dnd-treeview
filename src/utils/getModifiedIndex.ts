import { getDestIndex } from "./getDestIndex";
import type { NodeModel } from "~/types";

const getSrcIndex = (tree: NodeModel[], dragSourceId: NodeModel["id"]) => {
  return tree.findIndex((node) => node.id === dragSourceId);
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
