import treeData from "../stories/assets/sample-default.json";
import { isAncestor } from "./isAncestor";

describe("isAncestor", () => {
	test("check the parent-child structure", () => {
		expect(isAncestor(treeData, 1, 2)).toBe(true);
		expect(isAncestor(treeData, 2, 1)).toBe(false);
		expect(isAncestor(treeData, 4, 6)).toBe(true);
		expect(isAncestor(treeData, 0, 6)).toBe(true);
	});

	test("returns false when source and target are the same node", () => {
		expect(isAncestor(treeData, 1, 1)).toBe(false);
	});

	test("returns false for non-existent target node", () => {
		expect(isAncestor(treeData, 1, 999)).toBe(false);
	});

	test("returns false for nodes in different subtrees", () => {
		expect(isAncestor(treeData, 1, 4)).toBe(false);
	});
});
