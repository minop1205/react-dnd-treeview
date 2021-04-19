import { useState, useCallback, useRef } from "react";
import {
  useDrag,
  useDrop,
  useDragLayer,
  DragElementWrapper,
  DragSourceOptions,
  DragPreviewOptions,
} from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import {
  NodeModel,
  DragItem,
  DragLayerMonitorProps,
  DragOverProps,
  ToggleHandler,
  InitialOpen,
  TreeContext,
} from "./types";

export const useDropContainer = (
  parentId: NodeModel["id"],
  context: TreeContext
): [boolean, DragElementWrapper<HTMLElement>] => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TREE_ITEM,
    drop: (item: DragItem, monitor) => {
      if (monitor.isOver({ shallow: true })) {
        context.onDrop(item.id, context.rootId);
      }
    },
    canDrop: (item: DragItem) => {
      const { tree, canDrop } = context;
      const dragItem = tree.find((node) => node.id === item.id) as NodeModel;

      if (canDrop) {
        return canDrop(dragItem.id, parentId);
      }

      return dragItem === undefined ? false : dragItem.parent !== 0;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }) && monitor.canDrop(),
    }),
  });

  return [isOver, drop];
};

export const useDragNode = (
  item: NodeModel,
  ref: React.RefObject<HTMLElement>
): [
  boolean,
  DragElementWrapper<DragSourceOptions>,
  DragElementWrapper<DragPreviewOptions>
] => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.TREE_ITEM, ref, ...item } as DragItem,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return [isDragging, drag, preview];
};

const isDroppable = (
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

const isAncestor = (
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

export const useDropNode = (
  item: NodeModel,
  context: TreeContext
): [boolean, DragElementWrapper<HTMLElement>] => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TREE_ITEM,
    drop: (dragItem: DragItem, monitor) => {
      if (monitor.isOver({ shallow: true })) {
        context.onDrop(dragItem.id, item.id);
      }
    },
    canDrop: (dragItem: DragItem) => {
      const { tree, canDrop } = context;

      if (canDrop) {
        return canDrop(dragItem.id, item.id);
      }

      return isDroppable(tree, dragItem.id, item.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }) && monitor.canDrop(),
    }),
  });

  return [isOver, drop];
};

export const useTreeDragLayer = (): DragLayerMonitorProps => {
  return useDragLayer((monitor) => {
    const itemType = monitor.getItemType();

    return {
      item: monitor.getItem() as DragItem,
      clientOffset: monitor.getClientOffset(),
      isDragging: monitor.isDragging() && itemType === ItemTypes.TREE_ITEM,
    };
  });
};

export const useDragOver = (
  id: NodeModel["id"],
  isOpen: boolean,
  dragOverHandler: (id: NodeModel["id"]) => void
): DragOverProps => {
  const stack = useRef<number>(0);
  const timer = useRef<number>(0);

  const onDragEnter = () => {
    stack.current += 1;

    if (stack.current === 1 && !isOpen) {
      timer.current = window.setTimeout(() => dragOverHandler(id), 500);
    }
  };

  const onDragLeave = () => {
    stack.current -= 1;

    if (stack.current === 0) {
      window.clearTimeout(timer.current);
    }
  };

  const onDrop = () => {
    if (timer.current > 0) {
      window.clearTimeout(timer.current);
    }

    stack.current = 0;
    timer.current = 0;
  };

  return {
    onDragEnter,
    onDragLeave,
    onDrop,
  };
};

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
