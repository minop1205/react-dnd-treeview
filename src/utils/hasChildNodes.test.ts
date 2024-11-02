import treeData from "../stories/assets/sample-default.json";
import { hasChildNodes } from "./hasChildNodes";

describe("hasChildNodes", () => {
  test("returns true if the child nodes exists, false otherwise", () => {
    expect(hasChildNodes(treeData, 1)).toBe(true);
    expect(hasChildNodes(treeData, 2)).toBe(false);
    expect(hasChildNodes(treeData, 4)).toBe(true);
    expect(hasChildNodes(treeData, 5)).toBe(true);
    expect(hasChildNodes(treeData, 6)).toBe(false);
    expect(hasChildNodes(treeData, 7)).toBe(false);
  });
});
