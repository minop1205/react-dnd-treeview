import React from "react";
import { NodeRender, TreeState } from "~/types";
import { isDroppable } from "./isDroppable";
import treeData from "../stories/assets/sample-default.json";

describe("isDroppable", () => {
  test("check for drop availability", () => {
    const render: NodeRender<unknown> = (node) => {
      return <div>{node.text}</div>;
    };

    const treeContext: TreeState<unknown> = {
      tree: treeData,
      rootId: 0,
      render,
      extraAcceptTypes: [],
      listComponent: "ul",
      listItemComponent: "li",
      placeholderComponent: "li",
      sort: false,
      insertDroppableFirst: true,
      enableAnimateExpand: false,
      dropTargetOffset: 0,
      initialOpen: false,
      openIds: [],
      onDrop: () => undefined,
      onToggle: () => undefined,
    };

    expect(isDroppable(7, 7, treeContext)).toBe(false);
    expect(isDroppable(7, 1, treeContext)).toBe(true);
    expect(isDroppable(1, 1, treeContext)).toBe(false);
    expect(isDroppable(4, 5, treeContext)).toBe(false);
  });
});
