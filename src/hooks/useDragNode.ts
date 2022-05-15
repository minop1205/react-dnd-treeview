import { useEffect } from "react";
import {
  useDrag,
  DragElementWrapper,
  DragSourceOptions,
  DragPreviewOptions,
  ConnectDragSource,
  ConnectDragPreview,
} from "react-dnd";
import { ItemTypes } from "~/ItemTypes";
import { NodeModel, DragSourceElement } from "~/types";
import { useTreeContext } from "~/hooks";

let dragSourceElement: DragSourceElement = null;

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

export const useDragNode = <T>(
  item: NodeModel,
  ref: React.RefObject<HTMLElement>
): [
  boolean,
  DragElementWrapper<DragSourceOptions>,
  DragElementWrapper<DragPreviewOptions>
] => {
  const treeContext = useTreeContext<T>();

  useEffect(() => {
    const node = ref.current;
    node?.addEventListener("dragstart", handleDragStart);
    node?.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });

    return () => {
      node?.removeEventListener("dragstart", handleDragStart);
      node?.removeEventListener("touchstart", handleTouchStart);
    };
  }, [ref]);

  const [{ isDragging }, drag, preview]: [
    { isDragging: boolean },
    ConnectDragSource,
    ConnectDragPreview
  ] = useDrag({
    type: ItemTypes.TREE_ITEM,
    item: () => ({
      ref,
      ...item,
    }),
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
