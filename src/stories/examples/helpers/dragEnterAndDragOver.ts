import { fireEvent, waitFor } from "@storybook/testing-library";
import { PointerCoords } from "~/stories/types";

export const dragEnterAndDragOver = (
  dropTarget: Element,
  pointerCoords: PointerCoords
): Promise<null> =>
  waitFor(
    () =>
      new Promise((r) => {
        fireEvent.dragEnter(dropTarget, pointerCoords);
        fireEvent.dragOver(dropTarget, pointerCoords);
        setTimeout(r, 50);
      })
  );
