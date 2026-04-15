export const interactionsDisabled =
	typeof process !== "undefined" &&
	process.env.STORYBOOK_DISABLE_INTERACTIONS === "true";
