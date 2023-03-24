import { useEffect, useMemo, useState } from "react";
import { hasChildNodes } from "~/utils";
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
  // Only a parent node with a child node can be opened.
  // The droppable property has no effect.
  // However, if an ID is specified, It is applied unconditionally.
  const initialOpenIds: NodeModel["id"][] = useMemo(() => {
    if (initialOpen === true) {
      return tree
        .filter((node) => hasChildNodes(tree, node.id))
        .map((node) => node.id);
    } else if (Array.isArray(initialOpen)) {
      return initialOpen;
    }
    return [];
  }, [initialOpen]);

  const [openIds, setOpenIds] = useState<NodeModel["id"][]>(initialOpenIds);

  useEffect(() => setOpenIds(initialOpenIds), [initialOpen]);

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
      .filter((node) => hasChildNodes(tree, node.id))
      .map((node) => node.id);
    setOpenIds(newOpenIds);

    if (callback) {
      callback(newOpenIds);
    }
  };

  const handleOpen: OpenHandler = (targetIds, callback) => {
    let newOpenIds: NodeModel["id"][] = [];

    if (Array.isArray(targetIds)) {
      const targetNodes = tree.filter(
        (node) => targetIds.includes(node.id) && hasChildNodes(tree, node.id)
      );
      newOpenIds = [...openIds, ...targetNodes.map((node) => node.id)].filter(
        (value, index, self) => self.indexOf(value) === index
      );
    } else {
      newOpenIds = openIds.includes(targetIds)
        ? openIds
        : [...openIds, targetIds];
    }

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
