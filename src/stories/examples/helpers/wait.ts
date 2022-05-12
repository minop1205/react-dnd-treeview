import { waitFor } from "@storybook/testing-library";

export const wait = async (duration = 50): Promise<void> =>
  waitFor(() => new Promise((r) => setTimeout(r, duration)));
