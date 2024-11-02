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
});
