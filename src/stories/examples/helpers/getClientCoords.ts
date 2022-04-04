import { PointerCoords } from "~/stories/types";

export const getClientCoords = (element: Element, offset: PointerCoords) => {
  const { x, y } = element.getBoundingClientRect();

  return {
    clientX: x + offset.x,
    clientY: y + offset.y,
  };
};
