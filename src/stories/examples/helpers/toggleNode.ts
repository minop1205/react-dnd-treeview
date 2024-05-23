import { userEvent } from "@storybook/test";
import { wait } from "./wait";

export const toggleNode = async (targetElement: HTMLElement) => {
  await wait();
  userEvent.click(targetElement);
  await wait();
};
