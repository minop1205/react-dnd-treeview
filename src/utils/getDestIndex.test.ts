import treeData from "../stories/assets/sample-default.json";
import { getDestIndex } from "./getDestIndex";

describe("getDestIndex", () => {
  test("check modified indexes", () => {
    let destIndex = getDestIndex(treeData, 0, 0);

    expect(destIndex).toBe(0);

    destIndex = getDestIndex(treeData, 0, 1);

    expect(destIndex).toBe(3);

    destIndex = getDestIndex(treeData, 0, 2);

    expect(destIndex).toBe(6);

    destIndex = getDestIndex(treeData, 0, 3);

    expect(destIndex).toBe(7);

    destIndex = getDestIndex(treeData, 5, 0);

    expect(destIndex).toBe(0);

    destIndex = getDestIndex(treeData, 5, 1);

    expect(destIndex).toBe(6);
  });
});
