import { useRef } from "react";
import { NodeModel, DragOverProps } from "~/types";

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
