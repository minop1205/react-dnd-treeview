import { fireEvent } from "@storybook/testing-library";

export const dragLeaveAndDragEnd = (
  dragSource: Element,
  dropTarget: Element
): void => {
  fireEvent.dragLeave(dropTarget);
  fireEvent.dragEnd(dragSource);
  fireEvent.dragEnd(window);
};
