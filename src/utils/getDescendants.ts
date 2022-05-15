import { NodeModel } from "~/types";

export const getDescendants = <T = unknown>(
  treeData: NodeModel<T>[],
  id: NodeModel["id"]
): NodeModel<T>[] => {
  let descendants: NodeModel<T>[] = [];

  const search = (tree: NodeModel<T>[], ids: NodeModel["id"][]) => {
    const children = tree.filter((node) => ids.includes(node.parent));

    if (children.length > 0) {
      descendants = [...descendants, ...children];

      search(
        tree,
        children.map((node) => node.id)
      );
    }
  };

  search(treeData, [id]);

  return descendants;
};
