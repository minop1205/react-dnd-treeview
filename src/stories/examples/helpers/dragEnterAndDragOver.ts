import { fireEvent, waitFor } from "@storybook/testing-library";
import { PointerCoords } from "~/stories/types";
import { wait } from "./wait";

export const dragEnterAndDragOver = async (
  dropTarget: Element,
  pointerCoords: PointerCoords
) => {
  await wait();
  fireEvent.dragEnter(dropTarget, pointerCoords);
  fireEvent.dragOver(dropTarget, pointerCoords);
  await wait();
};
