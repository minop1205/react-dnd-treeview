import { NodeModel } from "~/types";
import { getModifiedIndex } from "./getModifiedIndex";

const arrayMoveMutable = <T>(
  array: T[],
  fromIndex: number,
  toIndex: number
) => {
  const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

  if (startIndex >= 0 && startIndex < array.length) {
    const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;
    const [item] = array.splice(fromIndex, 1);
    array.splice(endIndex, 0, item);
  }
};

export const mutateTreeWithIndex = <T>(
  tree: NodeModel<T>[],
  dragSourceId: NodeModel["id"],
  dropTargetId: NodeModel["id"],
  index: number
): NodeModel<T>[] => {
  const [srcIndex, destIndex] = getModifiedIndex(
    tree,
    dragSourceId,
    dropTargetId,
    index
  );

  const newTree = [...tree];
  arrayMoveMutable(newTree, srcIndex, destIndex);

  return newTree.map((node) => {
    if (node.id === dragSourceId) {
      return {
        ...node,
        parent: dropTargetId,
      };
    }

    return node;
  });
};
