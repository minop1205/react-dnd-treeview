import type { NodeModel } from "~/types";
import { mutateTreeWithIndex } from "./mutateTreeWithIndex";

describe("mutateTreeWithIndex", () => {
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

		const treeAfter: NodeModel[] = mutateTreeWithIndex(treeBefore, 2, 1, 0);

		treeBefore[1].text = "c";

		expect(treeAfter).toEqual([
			{
				id: 2,
				parent: 1,
				droppable: true,
				text: "b",
			},
			{
				id: 1,
				parent: 0,
				droppable: true,
				text: "a",
			},
		]);
	});

	test("does not mutate the original tree", () => {
		const tree: NodeModel[] = [
			{ id: 1, parent: 0, droppable: true, text: "a" },
			{ id: 2, parent: 0, droppable: true, text: "b" },
		];
		const originalIds = tree.map((n) => n.id);

		mutateTreeWithIndex(tree, 2, 1, 0);

		expect(tree.map((n) => n.id)).toEqual(originalIds);
	});
});
