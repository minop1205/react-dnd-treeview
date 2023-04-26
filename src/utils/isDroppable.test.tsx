import React from "react";
import { NodeRender, TreeState, NativeDragItem } from "~/types";
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

    const nativeDragSource: NativeDragItem = {
      dataTransfer: {} as DataTransfer,
    };

    expect(isDroppable(treeData[6], 7, treeContext, null)).toBe(false);
    expect(isDroppable(treeData[6], 1, treeContext, null)).toBe(true);
    expect(isDroppable(treeData[0], 1, treeContext, null)).toBe(false);
    expect(isDroppable(treeData[3], 5, treeContext, null)).toBe(false);
    expect(isDroppable(treeData[6], 0, treeContext, null)).toBe(false);
    expect(isDroppable(treeData[1], 0, treeContext, null)).toBe(true);
    expect(isDroppable(null, 0, treeContext, null)).toBe(true);
    expect(isDroppable(null, 1, treeContext, null)).toBe(true);
    expect(isDroppable(null, 2, treeContext, null)).toBe(false);
    expect(isDroppable(nativeDragSource, 0, treeContext, null)).toBe(true);
    expect(isDroppable(nativeDragSource, 1, treeContext, null)).toBe(true);
    expect(isDroppable(nativeDragSource, 2, treeContext, null)).toBe(false);

    treeContext.canDrop = () => {
      return false;
    };

    expect(isDroppable(treeData[6], 7, treeContext, null)).toBe(false);
    expect(isDroppable(treeData[6], 1, treeContext, null)).toBe(false);
    expect(isDroppable(treeData[0], 1, treeContext, null)).toBe(false);
    expect(isDroppable(treeData[3], 5, treeContext, null)).toBe(false);
    expect(isDroppable(treeData[6], 0, treeContext, null)).toBe(false);
    expect(isDroppable(treeData[1], 0, treeContext, null)).toBe(false);
    expect(isDroppable(null, 0, treeContext, null)).toBe(true);
    expect(isDroppable(null, 1, treeContext, null)).toBe(true);
    expect(isDroppable(null, 2, treeContext, null)).toBe(false);
    expect(isDroppable(nativeDragSource, 0, treeContext, null)).toBe(false);
    expect(isDroppable(nativeDragSource, 1, treeContext, null)).toBe(false);
    expect(isDroppable(nativeDragSource, 2, treeContext, null)).toBe(false);

    treeContext.canDrop = () => {
      return true;
    };

    expect(isDroppable(treeData[6], 7, treeContext, null)).toBe(true);
    expect(isDroppable(treeData[6], 1, treeContext, null)).toBe(true);
    expect(isDroppable(treeData[0], 1, treeContext, null)).toBe(true);
    expect(isDroppable(treeData[3], 5, treeContext, null)).toBe(true);
    expect(isDroppable(treeData[6], 0, treeContext, null)).toBe(true);
    expect(isDroppable(treeData[1], 0, treeContext, null)).toBe(true);
    expect(isDroppable(null, 0, treeContext, null)).toBe(true);
    expect(isDroppable(null, 1, treeContext, null)).toBe(true);
    expect(isDroppable(null, 2, treeContext, null)).toBe(false);
    expect(isDroppable(nativeDragSource, 0, treeContext, null)).toBe(true);
    expect(isDroppable(nativeDragSource, 1, treeContext, null)).toBe(true);
    expect(isDroppable(nativeDragSource, 2, treeContext, null)).toBe(true);
  });
});
