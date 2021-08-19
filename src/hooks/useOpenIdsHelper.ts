import { useState, useCallback } from "react";
import {
  NodeModel,
  ToggleHandler,
  OpenHandler,
  CloseHandler,
  InitialOpen,
} from "../types";

export const useOpenIdsHelper = (
  tree: NodeModel[],
  initialOpen?: InitialOpen
): [
  NodeModel["id"][],
  {
    handleToggle: ToggleHandler;
    handleCloseAll: () => void;
    handleOpenAll: () => void;
    handleOpen: OpenHandler;
    handleClose: CloseHandler;
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

  const handleOpen = useCallback<OpenHandler>(
    (targetIds) =>
      setOpenIds(
        [
          ...openIds,
          ...tree
            .filter(
              (node) =>
                node.droppable &&
                (Array.isArray(targetIds)
                  ? targetIds.includes(node.id)
                  : node.id === targetIds)
            )
            .map((node) => node.id),
        ].filter((value, index, self) => self.indexOf(value) === index)
      ),
    [tree, openIds]
  );

  const handleClose = useCallback<CloseHandler>(
    (targetIds) =>
      setOpenIds(
        openIds.filter((id) =>
          Array.isArray(targetIds) ? !targetIds.includes(id) : id !== targetIds
        )
      ),
    [tree, openIds]
  );

  return [
    openIds,
    { handleToggle, handleCloseAll, handleOpenAll, handleOpen, handleClose },
  ];
};
