import treeData from "../stories/assets/sample-default.json";
import { getDescendants } from "./getDescendants";

describe("getDescendants", () => {
	test("get descendant nodes by id", () => {
		let descendantIds = getDescendants(treeData, 1).map((n) => n.id);

		expect(descendantIds.includes(2)).toBe(true);
		expect(descendantIds.includes(3)).toBe(true);

		descendantIds = getDescendants(treeData, 4).map((n) => n.id);

		expect(descendantIds.includes(5)).toBe(true);
		expect(descendantIds.includes(6)).toBe(true);

		descendantIds = getDescendants(treeData, 7).map((n) => n.id);

		expect(descendantIds.length).toBe(0);
	});

	test("returns empty array for empty tree", () => {
		expect(getDescendants([], 1)).toEqual([]);
	});

	test("returns empty array for non-existent node id", () => {
		expect(getDescendants(treeData, 999)).toEqual([]);
	});

	test("returns all nodes when searching from root id 0", () => {
		const descendants = getDescendants(treeData, 0);
		expect(descendants.length).toBe(treeData.length);
	});

	test("recursively collects multi-level descendants", () => {
		const descendants = getDescendants(treeData, 4);
		const ids = descendants.map((n) => n.id);
		expect(ids).toContain(5);
		expect(ids).toContain(6);
		expect(descendants.length).toBe(2);
	});
});
