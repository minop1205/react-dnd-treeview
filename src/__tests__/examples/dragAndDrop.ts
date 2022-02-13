import { fireEvent, act } from "@testing-library/react";

export const dragAndDrop = async (src: Element, dst: Element) => {
  // wait for placeholder context is updated.
  await act(
    () =>
      new Promise((r) => {
        fireEvent.dragStart(src);
        fireEvent.dragEnter(dst);
        fireEvent.dragOver(dst);

        setTimeout(r, 20);
      })
  );

  fireEvent.drop(dst);
  fireEvent.dragLeave(dst);
  fireEvent.dragEnd(src);
  fireEvent.dragEnd(window);
};
