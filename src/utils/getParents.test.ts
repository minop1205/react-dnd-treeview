import treeData from "../stories/assets/sample-default.json";
import { getParents } from "./getParents";

describe("getParents", () => {
	test("get parental nodes by id", () => {
		let parentalIds = getParents(treeData, 1).map((n) => n.id);

		expect(parentalIds.includes(0)).toBe(false);
		expect(parentalIds.includes(2)).toBe(false);
		expect(parentalIds.length).toBe(0);

		parentalIds = getParents(treeData, 3).map((n) => n.id);

		expect(parentalIds.includes(1)).toBe(true);
		expect(parentalIds.length).toBe(1);

		parentalIds = getParents(treeData, 6).map((n) => n.id);

		expect(parentalIds.length).toBe(2);
	});

	test("returns empty array for empty tree", () => {
		expect(getParents([], 1)).toEqual([]);
	});

	test("returns empty array for non-existent node id", () => {
		expect(getParents(treeData, 999)).toEqual([]);
	});

	test("returns ancestors in order from immediate parent to root", () => {
		const parentalIds = getParents(treeData, 6).map((n) => n.id);
		expect(parentalIds[0]).toBe(5);
		expect(parentalIds[1]).toBe(4);
	});
});
