import { userEvent } from "@storybook/testing-library";
import { wait } from "./wait";

export const toggleNode = async (targetElement: HTMLElement) => {
  await wait();
  userEvent.click(targetElement);
  await wait();
};
