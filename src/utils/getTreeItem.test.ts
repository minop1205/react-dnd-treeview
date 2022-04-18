import { NodeModel } from "~/types";
import { getTreeItem } from "./getTreeItem";

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
