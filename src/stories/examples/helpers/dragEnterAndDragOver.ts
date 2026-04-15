import { fireEvent } from "@storybook/test";
import type { PointerCoords } from "~/stories/types";
import { wait } from "./wait";

export const dragEnterAndDragOver = async (
	dropTarget: Element,
	pointerCoords: PointerCoords,
) => {
	await wait();
	await fireEvent.dragEnter(dropTarget, pointerCoords);
	await fireEvent.dragOver(dropTarget, pointerCoords);
	await wait();
};
