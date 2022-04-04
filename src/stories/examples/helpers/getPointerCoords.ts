import { OffsetCoords } from "~/stories/types";

export const getPointerCoords = (element: Element, offset?: OffsetCoords) => {
  const { x, y } = element.getBoundingClientRect();

  return offset
    ? {
        clientX: x + offset.x,
        clientY: y + offset.y,
      }
    : {
        clientX: x,
        clientY: y,
      };
};
