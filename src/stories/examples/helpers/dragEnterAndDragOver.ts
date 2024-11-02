import { fireEvent } from "@storybook/test";
import { wait } from "./wait";
import type { PointerCoords } from "~/stories/types";

export const dragEnterAndDragOver = async (
  dropTarget: Element,
  pointerCoords: PointerCoords,
) => {
  await wait();
  await fireEvent.dragEnter(dropTarget, pointerCoords);
  await fireEvent.dragOver(dropTarget, pointerCoords);
  await wait();
};
