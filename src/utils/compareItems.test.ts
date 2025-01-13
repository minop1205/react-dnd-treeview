import { compareItems } from "./compareItems";
import type { NodeModel } from "~/types";

describe("compareItems", () => {
  test("compare tree item order", () => {
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
