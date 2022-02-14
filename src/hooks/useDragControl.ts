import { useEffect, useContext } from "react";
import { DragControlContext } from "~/providers";

/**
 * This is a hook to allow text selection by mouse in the text input area in a node.
 * Temporarily disables node dragging while the pointer is over the text input area.
 */
export const useDragControl = (ref: React.RefObject<HTMLElement>): void => {
  const dragControlContext = useContext(DragControlContext);

  const lock = (e: Event) => {
    const { target } = e;

    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement
    ) {
      dragControlContext.lock();
    }
  };

  const unlock = (e: Event) => {
    const { target } = e;

    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement
    ) {
      dragControlContext.unlock();
    }
  };

  const handleMouseOver = (e: MouseEvent) => lock(e);
  const handleMouseOut = (e: MouseEvent) => unlock(e);
  const handleFocusIn = (e: FocusEvent) => lock(e);
  const handleFocusOut = (e: FocusEvent) => unlock(e);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    // In Firefox or Safari,
    // the focusout event is not fired when the focused element is unmounted.
    // Therefore, it detects the unmounting of a child element
    // and unlocks tree if the focus is on the body element after unmounting.
    const observer = new MutationObserver(() => {
      if (document.activeElement === document.body) {
        dragControlContext.unlock();
      }
    });

    observer.observe(ref.current, {
      subtree: true,
      childList: true,
    });

    ref.current?.addEventListener("mouseover", handleMouseOver);
    ref.current?.addEventListener("mouseout", handleMouseOut);
    ref.current?.addEventListener("focusin", handleFocusIn);
    ref.current?.addEventListener("focusout", handleFocusOut);

    return () => {
      observer.disconnect();
      ref.current?.removeEventListener("mouseover", handleMouseOver);
      ref.current?.removeEventListener("mouseout", handleMouseOut);
      ref.current?.removeEventListener("focusin", handleFocusIn);
      ref.current?.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  useEffect(() => {
    ref.current?.setAttribute(
      "draggable",
      dragControlContext.isLock ? "false" : "true"
    );
  }, [dragControlContext.isLock]);
};
