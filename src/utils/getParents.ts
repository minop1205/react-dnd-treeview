import { NodeModel } from "~/types";

/** Get all parental nodes of the given node id. */
export function getParents<T = unknown>(
  treeData: NodeModel<T>[],
  id: NodeModel["id"]
) {
  let parents: NodeModel<T>[] = [];
  let node = treeData.find((el) => el.id === id);
  while (node) {
    node = treeData.find((el) => el.id === node!.parent);
    if (node) parents.push(node);
  }
  return parents;
}
