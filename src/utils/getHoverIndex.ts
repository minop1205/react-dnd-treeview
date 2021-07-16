import { DropTargetMonitor } from "react-dnd";
import { isDroppable } from "./isDroppable";
import { NodeModel, TreeState, DragItem } from "../types";

type CompareResult = "up" | "down";

type VerticalPosition = "upper" | "middle" | "lower";

type HoverIndex = {
  parentId: NodeModel["id"];
  index: number;
} | null;

type CompareYCoord = (el: Element, pointerY: number) => CompareResult;

type GetInnerIndex = (
  listItems: NodeListOf<Element>,
  monitor: DropTargetMonitor
) => number;

type GetOuterIndex = (
  dropTarget: NodeModel,
  dropTargetEl: HTMLElement,
  monitor: DropTargetMonitor
) => HoverIndex;

type GetHoverPosition = (el: Element, pointerY: number) => VerticalPosition;

type IsDroppableParent = (
  dragSourceId: NodeModel["id"],
  parentId: NodeModel["id"],
  context: TreeState
) => boolean;

type GetHoverIndex = (
  dropTarget: NodeModel,
  dropTargetEl: HTMLElement | null,
  monitor: DropTargetMonitor,
  context: TreeState
) => HoverIndex;

const indexChangeOffset = 5;

const compareYCoord: CompareYCoord = (el, pointerY) => {
  const bbox = el.getBoundingClientRect();
  const centerY = bbox.top + bbox.height / 2;
  return pointerY > centerY ? "down" : "up";
};

const getInnerIndex: GetInnerIndex = (listItems, monitor) => {
  let pos = "";
  let index = 0;

  listItems.forEach((el, key) => {
    const flag = compareYCoord(el, monitor.getClientOffset()?.y || 0);

    if (pos === "") {
      pos = flag;
    } else if (pos !== flag) {
      pos = flag;
      index = key;
    }

    if (key === listItems.length - 1 && flag === "down") {
      index = key + 1;
    }
  });

  return index;
};

const getOuterIndex: GetOuterIndex = (dropTarget, dropTargetEl, monitor) => {
  const parentList = dropTargetEl.closest('[role="list"]');
  const parentListItems = parentList?.querySelectorAll(
    ':scope > [role="listitem"]'
  );

  if (!parentListItems) {
    return null;
  }

  return {
    parentId: dropTarget.parent,
    index: getInnerIndex(parentListItems, monitor),
  };
};

const getHoverPosition: GetHoverPosition = (el, pointerY) => {
  const bbox = el.getBoundingClientRect();
  const offsetY = indexChangeOffset;
  const upSideY = bbox.top + offsetY;
  const lowerSideY = bbox.bottom - offsetY;

  if (pointerY > lowerSideY) {
    return "lower";
  } else if (pointerY < upSideY) {
    return "upper";
  }

  return "middle";
};

const isDroppableParent: IsDroppableParent = (
  dragSourceId,
  parentId,
  context
) => {
  const { tree, rootId, canDrop } = context;

  if (parentId === rootId) {
    return true;
  }

  if (canDrop && canDrop(dragSourceId, parentId)) {
    return true;
  }

  if (isDroppable(tree, dragSourceId, parentId)) {
    return true;
  }

  return false;
};

export const getHoverIndex: GetHoverIndex = (
  dropTarget,
  dropTargetEl,
  monitor,
  context
) => {
  if (!dropTargetEl) {
    return {
      parentId: 0,
      index: 0,
    };
  }

  const dragSource = monitor.getItem<DragItem>();
  const list = dropTargetEl.querySelector('[role="list"]');
  const hoverPosition = getHoverPosition(
    dropTargetEl,
    monitor.getClientOffset()?.y || 0
  );

  if (!list) {
    if (hoverPosition === "middle") {
      return {
        parentId: dropTarget.id,
        index: 0,
      };
    }

    if (isDroppableParent(dragSource.id, dropTarget.id, context)) {
      return getOuterIndex(dropTarget, dropTargetEl, monitor);
    }

    return null;
  } else {
    if (hoverPosition === "upper") {
      if (isDroppableParent(dragSource.id, dropTarget.id, context)) {
        return getOuterIndex(dropTarget, dropTargetEl, monitor);
      } else {
        return {
          parentId: dropTarget.id,
          index: 0,
        };
      }
    }

    const listItems = list.querySelectorAll(':scope > [role="listitem"]');

    return {
      parentId: dropTarget.id,
      index: getInnerIndex(listItems, monitor),
    };
  }
};
