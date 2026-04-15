import type { NodeModel } from "~/types";

export const isNodeModel = <T>(arg: unknown): arg is NodeModel<T> => {
	return (
		typeof arg === "object" &&
		arg !== null &&
		"id" in arg &&
		"parent" in arg &&
		"text" in arg
	);
};
