import { useEffect, useContext } from "react";
import { DragControlContext } from "../Tree";

export const useDragSourceElement = (
  ref: React.RefObject<HTMLElement>
): void => {
  const dragControlContext = useContext(DragControlContext);

  const register = (e: DragEvent | TouchEvent): void => {
    const target = e.target as Element;
    const source = target.closest('[role="listitem"]');

    if (e.currentTarget === source) {
      dragControlContext.registerDragSourceElement(source);
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
};
