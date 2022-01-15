import { useEffect } from "react";
import {
  useDrag,
  DragElementWrapper,
  DragSourceOptions,
  DragPreviewOptions,
} from "react-dnd";
import { ItemTypes } from "../ItemTypes";
import { NodeModel, DragSourceElement } from "../types";
import { useTreeContext } from "../hooks";

let dragSourceElement: DragSourceElement = null;

export const useDragNode = <T>(
  item: NodeModel,
  ref: React.RefObject<HTMLElement>
): [
  boolean,
  DragElementWrapper<DragSourceOptions>,
  DragElementWrapper<DragPreviewOptions>
] => {
  const treeContext = useTreeContext<T>();

  const register = (e: DragEvent | TouchEvent): void => {
    const { target } = e;

    if (target instanceof HTMLElement) {
      const source = target.closest('[role="listitem"]');

      if (e.currentTarget === source) {
        dragSourceElement = source;
      }
    }
  };

  const handleDragStart = (e: DragEvent) => register(e);
  const handleTouchStart = (e: TouchEvent) => register(e);

  useEffect(() => {
    ref.current?.addEventListener("dragstart", handleDragStart);
    ref.current?.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });

    return () => {
      ref.current?.removeEventListener("dragstart", handleDragStart);
      ref.current?.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      type: ItemTypes.TREE_ITEM,
      ref,
      ...item,
    },
    canDrag: () => {
      const { canDrag } = treeContext;

      if (dragSourceElement !== ref.current) {
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
