import { produce } from "immer";
import { NodeModel, SortCallback } from "./types";

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

export const getTreeItem = (
  tree: NodeModel[],
  id: NodeModel["id"]
): NodeModel | undefined => {
  const node = tree.find((n) => n.id === id);

  if (!node) {
    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return produce(node, () => {});
};

export const compareItems: SortCallback = (a, b) => {
  if (a.text > b.text) {
    return 1;
  } else if (a.text < b.text) {
    return -1;
  }

  return 0;
};

export const isAncestor = (
  tree: NodeModel[],
  sourceId: NodeModel["id"],
  targetId: NodeModel["id"]
): boolean => {
  if (targetId === 0) {
    return false;
  }

  const targetNode = tree.find((node) => node.id === targetId);

  if (targetNode === undefined) {
    return false;
  }

  if (targetNode.parent === sourceId) {
    return true;
  }

  return isAncestor(tree, sourceId, targetNode.parent);
};

export const isDroppable = (
  tree: NodeModel[],
  sourceId: NodeModel["id"],
  targetId: NodeModel["id"]
): boolean => {
  if (sourceId === targetId) {
    return false;
  }

  const sourceNode = tree.find((node) => node.id === sourceId);

  if (sourceNode === undefined || sourceNode.parent === targetId) {
    return false;
  }

  return !isAncestor(tree, sourceId, targetId);
};
