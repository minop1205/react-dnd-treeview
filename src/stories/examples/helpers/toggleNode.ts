import { userEvent } from "@storybook/test";
import { wait } from "./wait";

export const toggleNode = async (targetElement: HTMLElement) => {
	await wait();
	await userEvent.click(targetElement);
	await wait();
};
