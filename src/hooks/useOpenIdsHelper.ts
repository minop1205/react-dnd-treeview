import { useEffect, useMemo, useState } from "react";
import {
  NodeModel,
  ToggleHandler,
  OpenHandler,
  CloseHandler,
  ChangeOpenHandler,
  InitialOpen,
} from "~/types";

export const useOpenIdsHelper = (
  tree: NodeModel[],
  initialOpen?: InitialOpen
): [
  NodeModel["id"][],
  {
    handleToggle: ToggleHandler;
    handleCloseAll: (callback?: ChangeOpenHandler) => void;
    handleOpenAll: (callback?: ChangeOpenHandler) => void;
    handleOpen: OpenHandler;
    handleClose: CloseHandler;
  }
] => {
  let initialOpenIds: NodeModel["id"][] = useMemo(() => {
    if (initialOpen === true) {
      return initialOpenIds = tree
        .filter((node) => node.droppable)
        .map((node) => node.id);
    } else if (Array.isArray(initialOpen)) {
      return initialOpen;
    }
    return []
  },[initialOpen]);

  const [openIds, setOpenIds] = useState<NodeModel["id"][]>(initialOpenIds);

  useEffect(() => setOpenIds(initialOpenIds), [initialOpen])

  const handleToggle: ToggleHandler = (targetId: NodeModel["id"], callback) => {
    const newOpenIds = openIds.includes(targetId)
      ? openIds.filter((id) => id !== targetId)
      : [...openIds, targetId];

    setOpenIds(newOpenIds);

    if (callback) {
      callback(newOpenIds);
    }
  };

  const handleCloseAll = (callback: ChangeOpenHandler | undefined) => {
    setOpenIds([]);

    if (callback) {
      callback([]);
    }
  };

  const handleOpenAll = (callback: ChangeOpenHandler | undefined) => {
    const newOpenIds = tree
      .filter((node) => node.droppable)
      .map((node) => node.id);
    setOpenIds(newOpenIds);

    if (callback) {
      callback(newOpenIds);
    }
  };

  const handleOpen: OpenHandler = (targetIds, callback) => {
    const newOpenIds = [
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
    ].filter((value, index, self) => self.indexOf(value) === index);

    setOpenIds(newOpenIds);

    if (callback) {
      callback(newOpenIds);
    }
  };

  const handleClose: CloseHandler = (targetIds, callback) => {
    const newOpenIds = openIds.filter((id) =>
      Array.isArray(targetIds) ? !targetIds.includes(id) : id !== targetIds
    );

    setOpenIds(newOpenIds);

    if (callback) {
      callback(newOpenIds);
    }
  };

  return [
    openIds,
    { handleToggle, handleCloseAll, handleOpenAll, handleOpen, handleClose },
  ];
};
