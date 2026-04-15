import treeData from "../stories/assets/sample-default.json";
import { getModifiedIndex } from "./getModifiedIndex";

describe("getModifiedIndex", () => {
	test("check modified indexes", () => {
		let [srcIndex, destIndex] = getModifiedIndex(treeData, 7, 0, 0);

		expect(srcIndex).toBe(6);
		expect(destIndex).toBe(0);

		[srcIndex, destIndex] = getModifiedIndex(treeData, 7, 1, 0);

		expect(srcIndex).toBe(6);
		expect(destIndex).toBe(0);

		[srcIndex, destIndex] = getModifiedIndex(treeData, 7, 0, 3);

		expect(srcIndex).toBe(6);
		expect(destIndex).toBe(6);

		[srcIndex, destIndex] = getModifiedIndex(treeData, 7, 0, 0);

		expect(srcIndex).toBe(6);
		expect(destIndex).toBe(0);

		[srcIndex, destIndex] = getModifiedIndex(treeData, 7, 0, 1);

		expect(srcIndex).toBe(6);
		expect(destIndex).toBe(3);

		[srcIndex, destIndex] = getModifiedIndex(treeData, 7, 5, 1);

		expect(srcIndex).toBe(6);
		expect(destIndex).toBe(6);

		[srcIndex, destIndex] = getModifiedIndex(treeData, 3, 5, 0);

		expect(srcIndex).toBe(2);
		expect(destIndex).toBe(0);
	});
});
