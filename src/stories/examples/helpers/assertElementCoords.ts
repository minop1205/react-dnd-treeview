import { expect } from "@storybook/test";

export const assertElementCoords = (element: Element, x: number, y: number) => {
  const topMargin = 40; // height of CodeSandbox link bar
  const bbox = element.getBoundingClientRect();
  expect(bbox.x).toBe(x);
  expect(bbox.y).toBe(y + topMargin);
};
