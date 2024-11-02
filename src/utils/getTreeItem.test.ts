import { getTreeItem } from "./getTreeItem";
import type { NodeModel } from "~/types";

describe("getTreeItem", () => {
  test("get tree item by id", () => {
    const tree: NodeModel[] = [
      {
        id: 1,
        parent: 0,
        droppable: true,
        text: "a",
      },
    ];

    expect(getTreeItem(tree, 1)?.text).toBe("a");
    expect(getTreeItem(tree, 2)).toBeUndefined();
  });
});
