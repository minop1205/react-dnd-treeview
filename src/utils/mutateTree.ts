import { produce } from "immer";
import { NodeModel } from "../types";

const getDestinationIndex = (
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

const arrayMoveImmutable = <T>(
  array: T[],
  fromIndex: number,
  toIndex: number
) => {
  array = [...array];
  arrayMoveMutable(array, fromIndex, toIndex);
  return array;
};

export const mutateTree = <T>(
  tree: NodeModel<T>[],
  dragSourceId: NodeModel["id"],
  dropTargetId: NodeModel["id"],
  index: number
): NodeModel<T>[] => {
  const srcIndex = tree.findIndex((node) => node.id === dragSourceId);
  const destIndex = getDestinationIndex(tree, dropTargetId, index);
  let newTree;

  if (destIndex > srcIndex) {
    newTree = arrayMoveImmutable(tree, srcIndex, destIndex - 1);
  } else {
    newTree = arrayMoveImmutable(tree, srcIndex, destIndex);
  }

  return produce(newTree, (draft) => {
    draft.forEach((node) => {
      if (node.id === dragSourceId) {
        node.parent = dropTargetId;
      }
    });
  });
};
