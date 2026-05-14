import type { NodeModel } from "~/types";
import { getTreeItem } from "./getTreeItem";

describe("getTreeItem", () => {
	test("get tree item by id", () => {
		const tree: NodeModel[] = [
			{
				id: 1,
				parent: 0,
				droppable: true,
				text: "a",
			},
		];

		expect(getTreeItem(tree, 1)?.text).toBe("a");
		expect(getTreeItem(tree, 2)).toBeUndefined();
	});

	test("returns the correct item from a multi-node tree", () => {
		const tree: NodeModel[] = [
			{ id: 1, parent: 0, droppable: true, text: "a" },
			{ id: 2, parent: 1, text: "b" },
			{ id: 3, parent: 1, text: "c" },
		];

		expect(getTreeItem(tree, 2)?.text).toBe("b");
		expect(getTreeItem(tree, 3)?.text).toBe("c");
	});
});
