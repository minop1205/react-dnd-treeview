import { fireEvent } from "@storybook/testing-library";
import { getPointerCoords } from "./getPointerCoords";
import { dragEnterAndDragOver } from "./dragEnterAndDragOver";
import { dragLeaveAndDragEnd } from "./dragLeaveAndDragEnd";
import { wait } from "./wait";

export const dragAndDrop = async (
  dragSource: Element,
  dropTarget: Element
): Promise<void> => {
  await wait();
  const coords = getPointerCoords(dropTarget);
  fireEvent.dragStart(dragSource);
  await dragEnterAndDragOver(dropTarget, coords);
  fireEvent.drop(dropTarget, coords);
  dragLeaveAndDragEnd(dragSource, dropTarget);
  await wait();
};
