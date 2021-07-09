import { useContext } from "react";
import { useDrop, DragElementWrapper } from "react-dnd";
import { ItemTypes } from "../ItemTypes";
import { TreeContext } from "../Tree";
import { NodeModel, DragItem } from "../types";
import { isDroppable } from "../utils";

export const useDropNode = (
  item: NodeModel
): [boolean, DragElementWrapper<HTMLElement>] => {
  const context = useContext(TreeContext);
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TREE_ITEM,
    drop: (dragItem: DragItem, monitor) => {
      if (monitor.isOver({ shallow: true })) {
        context.onDrop(dragItem.id, item.id);
      }
    },
    canDrop: (dragItem: DragItem) => {
      const { tree, canDrop } = context;

      if (canDrop) {
        return canDrop(dragItem.id, item.id);
      }

      return isDroppable(tree, dragItem.id, item.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }) && monitor.canDrop(),
    }),
  });

  return [isOver, drop];
};
