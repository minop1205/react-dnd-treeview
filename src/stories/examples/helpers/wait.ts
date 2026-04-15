import { waitFor } from "@storybook/test";

export const wait = async (duration = 100): Promise<void> =>
	waitFor(() => new Promise((r) => setTimeout(r, duration)));
