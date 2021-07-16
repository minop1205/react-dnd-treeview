import { useContext } from "react";
import { useDrop, DragElementWrapper } from "react-dnd";
import { ItemTypes } from "../ItemTypes";
import { TreeContext } from "../Tree";
import { NodeModel, DragItem } from "../types";

export const useDropContainer = (
  parentId: NodeModel["id"]
): [boolean, DragElementWrapper<HTMLElement>] => {
  const context = useContext(TreeContext);
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TREE_ITEM,
    drop: (item: DragItem, monitor) => {
      if (monitor.isOver({ shallow: true })) {
        context.onDrop(item.id, context.rootId);
      }
    },
    canDrop: (item: DragItem, monitor) => {
      if (monitor.isOver({ shallow: true })) {
        const { canDrop } = context;

        if (canDrop) {
          return canDrop(item.id, parentId);
        }

        return item === undefined ? false : item.parent !== 0;
      }

      return false;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }) && monitor.canDrop(),
    }),
  });

  return [isOver, drop];
};
