import React from "react";
import { getDescendants } from "~/utils";
import { TreeMethods, NodeModel } from "~/types";

const useTreeOpenHandler = () => {
  const ref = React.useRef<TreeMethods | null>(null);

  const [openIds, setOpenIds] = React.useState<(string | number)[]>([]);

  const open = (id: number | string) => {
    ref.current?.open(id);
    setOpenIds((p) => {
      return p.includes(id) ? p : [...p, id];
    });
  };
  const close = (id: number | string) => {
    ref.current?.close(id);
    setOpenIds((p) => {
      return [...p.filter((v) => v !== id)];
    });
  };
  const toggle = (id: number | string) => {
    openIds.includes(id) ? close(id) : open(id);
  };

  const getPipeHeight = (id: number | string, treeData: NodeModel[]) => {
    treeData = getDescendants(treeData, id);
    const ROW_HEIGHT = 32;
    const LIST_PADDING = 5;

    const droppableHeightExceedsRow = (node: NodeModel) =>
      node?.droppable && openIds.includes(node.id) && treeData.filter((n) => n.parent === node.id).length > 0;

    const getHeightOfId = (id: number | string): number => {
      const directChildren = treeData.filter((node) => node.parent === id);
      const heightOfChildren = directChildren.map((node) =>
        droppableHeightExceedsRow(node) ? getHeightOfId(node.id) + ROW_HEIGHT + LIST_PADDING : ROW_HEIGHT
      );
      const height = heightOfChildren.reduce((a, b) => a + b, 0);
      return height;
    };

    const lastChild = treeData.filter((node) => node.parent === id).reverse()[0];
    if (droppableHeightExceedsRow(lastChild)) {
      return getHeightOfId(id) - getHeightOfId(lastChild.id) - LIST_PADDING;
    }

    return getHeightOfId(id);
  };

  return { ref, open, close, toggle, getPipeHeight, openIds };
};

export default useTreeOpenHandler;
