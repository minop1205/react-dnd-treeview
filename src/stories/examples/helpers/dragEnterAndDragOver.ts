import { fireEvent, waitFor } from "@storybook/testing-library";
import { getClientCoords } from "./getClientCoords";

export const dragEnterAndDragOver = (
  dropTarget: Element,
  offset?: {
    x: number;
    y: number;
  }
): Promise<null> =>
  waitFor(
    () =>
      new Promise((r) => {
        if (offset) {
          const coords = getClientCoords(dropTarget, offset);
          fireEvent.dragEnter(dropTarget, coords);
          fireEvent.dragOver(dropTarget, coords);
        } else {
          fireEvent.dragEnter(dropTarget);
          fireEvent.dragOver(dropTarget);
        }

        setTimeout(r, 50);
      })
  );
