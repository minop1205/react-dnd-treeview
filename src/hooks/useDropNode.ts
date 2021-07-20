import { useContext } from "react";
import { useDrop, DragElementWrapper } from "react-dnd";
import { ItemTypes } from "../ItemTypes";
import { TreeContext } from "../Tree";
import { NodeModel, DragItem } from "../types";
import { isDroppable, getHoverIndex } from "../utils";

export const useDropNode = (
  item: NodeModel,
  ref: React.RefObject<HTMLElement>
): [boolean, NodeModel, DragElementWrapper<HTMLElement>] => {
  const context = useContext(TreeContext);
  const [{ isOver, dragSource }, drop] = useDrop({
    accept: ItemTypes.TREE_ITEM,
    drop: (dragSource: DragItem, monitor) => {
      if (monitor.isOver({ shallow: true })) {
        context.onDrop(dragSource.id, item.id);
      }
    },
    canDrop: (dragSource: DragItem, monitor) => {
      if (monitor.isOver({ shallow: true })) {
        const { tree, canDrop } = context;

        if (canDrop) {
          const result = canDrop(dragSource.id, item.id);

          if (result !== undefined) {
            return result;
          }
        }

        return isDroppable(dragSource.id, item.id, context);
      }

      return false;
    },
    hover: (dragSource, monitor) => {
      if (monitor.isOver({ shallow: true })) {
        console.log(getHoverIndex(item, ref.current, monitor, context));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }) && monitor.canDrop(),
      dragSource: monitor.getItem<NodeModel>(),
    }),
  });

  return [isOver, dragSource, drop];
};
