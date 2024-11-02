import { expect } from "@storybook/test";

export const assertElementCoords = async (
  element: Element,
  x: number,
  y: number,
) => {
  const topMargin = 40; // height of CodeSandbox link bar
  const bbox = element.getBoundingClientRect();
  await expect(bbox.x).toBe(x);
  await expect(bbox.y).toBe(y + topMargin);
};
