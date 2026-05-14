import type { NodeModel } from "~/types";
import { mutateTree } from "./mutateTree";

describe("mutateTree", () => {
	test("mutate tree items", () => {
		const treeBefore: NodeModel[] = [
			{
				id: 1,
				parent: 0,
				droppable: true,
				text: "a",
			},
			{
				id: 2,
				parent: 0,
				droppable: true,
				text: "b",
			},
		];

		const treeAfter: NodeModel[] = mutateTree(treeBefore, 2, 1);

		treeBefore[1].text = "c";

		expect(treeAfter).toEqual([
			{
				id: 1,
				parent: 0,
				droppable: true,
				text: "a",
			},
			{
				id: 2,
				parent: 1,
				droppable: true,
				text: "b",
			},
		]);
	});

	test("moves node to root when drop target id is 0", () => {
		const tree: NodeModel[] = [
			{ id: 1, parent: 0, droppable: true, text: "a" },
			{ id: 2, parent: 1, droppable: true, text: "b" },
		];

		const result = mutateTree(tree, 2, 0);
		expect(result.find((n) => n.id === 2)?.parent).toBe(0);
	});

	test("returns unchanged tree when drag source id does not exist", () => {
		const tree: NodeModel[] = [
			{ id: 1, parent: 0, droppable: true, text: "a" },
			{ id: 2, parent: 1, droppable: true, text: "b" },
		];

		const result = mutateTree(tree, 999, 0);
		expect(result).toEqual(tree);
	});
});
