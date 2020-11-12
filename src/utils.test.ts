import { NodeModel } from "./types";
import { mutateTree, compareItems } from "./utils";

describe("utilities test", () => {
  test("Mutate tree items", () => {
    const treeBefore: NodeModel[] = [
      {
        id: 1,
        parent: 0,
        droppable: true,
        text: "a",
      },
      {
        id: 2,
        parent: 0,
        droppable: true,
        text: "b",
      },
    ];

    const treeAfter: NodeModel[] = mutateTree(treeBefore, 2, 1);

    treeBefore[1].text = "c";

    expect(treeAfter).toEqual([
      {
        id: 1,
        parent: 0,
        droppable: true,
        text: "a",
      },
      {
        id: 2,
        parent: 1,
        droppable: true,
        text: "b",
      },
    ]);
  });

  test("Compare tree item order", () => {
    const nodeA: NodeModel = {
      id: 1,
      parent: 0,
      droppable: true,
      text: "a",
    };

    const nodeB: NodeModel = {
      id: 2,
      parent: 0,
      droppable: true,
      text: "b",
    };

    expect(compareItems(nodeA, nodeB)).toBe(-1);
    expect(compareItems(nodeB, nodeA)).toBe(1);
    expect(compareItems(nodeA, nodeA)).toBe(0);
  });
});
