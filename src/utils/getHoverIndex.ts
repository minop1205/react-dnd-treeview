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

type GetHoverPosition = (el: Element, pointerY: number) => VerticalPosition;

type GetOuterIndex = (
  dropTarget: NodeModel,
  dropTargetEl: HTMLElement,
  monitor: DropTargetMonitor
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

export const getHoverIndex = <T>(
  dropTarget: NodeModel<T> | null,
  dropTargetEl: HTMLElement | null,
  monitor: DropTargetMonitor,
  context: TreeState<T>
): HoverIndex => {
  if (!dropTargetEl) {
    return {
      parentId: context.rootId,
      index: 0,
    };
  }

  if (dropTarget === null) {
    const listItems = dropTargetEl.querySelectorAll(
      ':scope > [role="listitem"]'
    );

    return {
      parentId: context.rootId,
      index: getInnerIndex(listItems, monitor),
    };
  }

  const dragSource = monitor.getItem<DragItem<T>>();
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

    if (isDroppable(dragSource.id, dropTarget.parent, context)) {
      return getOuterIndex(dropTarget, dropTargetEl, monitor);
    }

    return null;
  } else {
    if (hoverPosition === "upper") {
      if (isDroppable(dragSource.id, dropTarget.parent, context)) {
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
