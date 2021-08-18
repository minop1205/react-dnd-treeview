import { produce } from "immer";
import arrayMove from "array-move";
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
    newTree = arrayMove(tree, srcIndex, destIndex - 1);
  } else {
    newTree = arrayMove(tree, srcIndex, destIndex);
  }

  return produce(newTree, (draft) => {
    draft.forEach((node) => {
      if (node.id === dragSourceId) {
        node.parent = dropTargetId;
      }
    });
  });
};
