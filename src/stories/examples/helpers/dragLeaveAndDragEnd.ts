import { fireEvent } from "storybook/test";

export const dragLeaveAndDragEnd = async (
	dragSource: Element,
	dropTarget: Element,
) => {
	await fireEvent.dragLeave(dropTarget);
	await fireEvent.dragEnd(dragSource);
	await fireEvent.dragEnd(window);
};
