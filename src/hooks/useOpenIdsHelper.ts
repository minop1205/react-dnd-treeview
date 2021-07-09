import { useState, useCallback } from "react";
import { NodeModel, ToggleHandler, InitialOpen } from "../types";

export const useOpenIdsHelper = (
  tree: NodeModel[],
  initialOpen?: InitialOpen
): [
  NodeModel["id"][],
  {
    handleToggle: ToggleHandler;
    handleCloseAll: () => void;
    handleOpenAll: () => void;
  }
] => {
  let initialOpenIds: NodeModel["id"][] = [];

  if (initialOpen === true) {
    initialOpenIds = tree
      .filter((node) => node.droppable)
      .map((node) => node.id);
  } else if (Array.isArray(initialOpen)) {
    initialOpenIds = initialOpen;
  }

  const [openIds, setOpenIds] = useState<NodeModel["id"][]>(initialOpenIds);

  const handleToggle = useCallback(
    (targetId: NodeModel["id"]) => {
      if (openIds.includes(targetId)) {
        setOpenIds(openIds.filter((id) => id !== targetId));
        return;
      }

      setOpenIds([...openIds, targetId]);
    },
    [openIds]
  );

  const handleCloseAll = useCallback(() => setOpenIds([]), []);

  const handleOpenAll = useCallback(
    () =>
      setOpenIds(tree.filter((node) => node.droppable).map((node) => node.id)),
    [tree]
  );

  return [openIds, { handleToggle, handleCloseAll, handleOpenAll }];
};
