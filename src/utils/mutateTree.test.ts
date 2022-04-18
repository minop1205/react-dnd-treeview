import { NodeModel } from "~/types";
import { mutateTree } from "./mutateTree";

describe("mutateTree", () => {
  test("mutate tree items", () => {
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
});
