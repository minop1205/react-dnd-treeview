import type { OffsetCoords } from "~/stories/types";

export const getPointerCoords = (element: Element, offset?: OffsetCoords) => {
	const { x, y } = element.getBoundingClientRect();

	return {
		clientX: x + (offset?.x ?? 0),
		clientY: y + (offset?.y ?? 0),
	};
};
