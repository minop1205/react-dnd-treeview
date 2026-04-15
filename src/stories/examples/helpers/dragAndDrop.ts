import { fireEvent } from "storybook/test";
import { dragEnterAndDragOver } from "./dragEnterAndDragOver";
import { dragLeaveAndDragEnd } from "./dragLeaveAndDragEnd";
import { getPointerCoords } from "./getPointerCoords";
import { wait } from "./wait";

export const dragAndDrop = async (
	dragSource: Element,
	dropTarget: Element,
): Promise<void> => {
	await wait();
	const coords = getPointerCoords(dropTarget);
	await fireEvent.dragStart(dragSource);
	await dragEnterAndDragOver(dropTarget, coords);
	await fireEvent.drop(dropTarget, coords);
	await dragLeaveAndDragEnd(dragSource, dropTarget);
	await wait();
};
