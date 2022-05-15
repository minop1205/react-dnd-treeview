import { expect } from "@storybook/jest";

export const assertElementCoords = (element: Element, x: number, y: number) => {
  const bbox = element.getBoundingClientRect();
  expect(bbox.x).toBe(x);
  expect(bbox.y).toBe(y);
};
