import { useContext } from "react";
import {
  useDrag,
  DragElementWrapper,
  DragSourceOptions,
  DragPreviewOptions,
} from "react-dnd";
import { ItemTypes } from "../ItemTypes";
import { TreeContext, DragControlContext } from "../Tree";
import { NodeModel } from "../types";

export const useDragNode = (
  item: NodeModel,
  ref: React.RefObject<HTMLElement>
): [
  boolean,
  DragElementWrapper<DragSourceOptions>,
  DragElementWrapper<DragPreviewOptions>
] => {
  const treeContext = useContext(TreeContext);
  const dragControlContext = useContext(DragControlContext);
  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.TREE_ITEM,
    item: { ref, ...item },
    canDrag: () => {
      const { canDrag } = treeContext;

      if (dragControlContext.dragSourceElement !== ref.current) {
        return false;
      }

      if (canDrag) {
        return canDrag(item.id);
      }

      return true;
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return [isDragging, drag, preview];
};
