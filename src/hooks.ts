import { useState, useCallback, useRef, useEffect, useContext } from "react";
import {
  useDrag,
  useDrop,
  useDragLayer,
  DragElementWrapper,
  DragSourceOptions,
  DragPreviewOptions,
} from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { TreeContext, DragSourceContext } from "./Tree";
import {
  NodeModel,
  DragItem,
  DragLayerMonitorProps,
  DragOverProps,
  ToggleHandler,
  InitialOpen,
} from "./types";
import { isDroppable } from "./utils";

export const useDropContainer = (
  parentId: NodeModel["id"]
): [boolean, DragElementWrapper<HTMLElement>] => {
  const context = useContext(TreeContext);
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
  const treeContext = useContext(TreeContext);
  const dragSourceContext = useContext(DragSourceContext);

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.TREE_ITEM,
    item: { ref, ...item },
    canDrag: () => {
      const { canDrag } = treeContext;

      if (dragSourceContext.dragSourceElement !== ref.current) {
        return false;
      }

      if (canDrag) {
        return canDrag(item.id);
      }

      return true;
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return [isDragging, drag, preview];
};

export const useDropNode = (
  item: NodeModel
): [boolean, DragElementWrapper<HTMLElement>] => {
  const context = useContext(TreeContext);
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

export const useDragSourceElement = (
  ref: React.RefObject<HTMLElement>
): void => {
  const context = useContext(DragSourceContext);

  const register = (e: DragEvent | TouchEvent): void => {
    const target = e.target as Element;
    const source = target.closest('[role="listitem"]');

    if (e.currentTarget === source) {
      context.registerDragSourceElement(source);
    }
  };

  const handleDragStart = (e: DragEvent) => register(e);
  const handleTouchStart = (e: TouchEvent) => register(e);

  useEffect(() => {
    ref.current?.addEventListener("dragstart", handleDragStart);
    ref.current?.addEventListener("touchstart", handleTouchStart);

    return () => {
      ref.current?.removeEventListener("dragstart", handleDragStart);
      ref.current?.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);
};
