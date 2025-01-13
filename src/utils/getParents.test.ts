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
});
