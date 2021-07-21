import { useEffect, useContext } from "react";
import {
  useDrag,
  DragElementWrapper,
  DragSourceOptions,
  DragPreviewOptions,
} from "react-dnd";
import { ItemTypes } from "../ItemTypes";
import { TreeContext } from "../providers";
import { NodeModel, DragSourceElement } from "../types";

let dragSourceElement: DragSourceElement = null;

export const useDragNode = (
  item: NodeModel,
  ref: React.RefObject<HTMLElement>
): [
  boolean,
  DragElementWrapper<DragSourceOptions>,
  DragElementWrapper<DragPreviewOptions>
] => {
  const treeContext = useContext(TreeContext);

  const register = (e: DragEvent | TouchEvent): void => {
    const target = e.target as Element;
    const source = target.closest('[role="listitem"]');

    if (e.currentTarget === source) {
      dragSourceElement = source;
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
    type: ItemTypes.TREE_ITEM,
    item: { ref, ...item },
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
