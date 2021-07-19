import { useContext } from "react";
import { useDrop, DragElementWrapper } from "react-dnd";
import { ItemTypes } from "../ItemTypes";
import { TreeContext } from "../Tree";
import { NodeModel, DragItem } from "../types";
import { getHoverIndex } from "../utils";

export const useDropContainer = (
  parentId: NodeModel["id"],
  ref: React.RefObject<HTMLElement>
): [boolean, NodeModel, DragElementWrapper<HTMLElement>] => {
  const context = useContext(TreeContext);
  const [{ isOver, dragSource }, drop] = useDrop({
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
          const result = canDrop(item.id, parentId);

          if (result !== undefined) {
            return result;
          }
        }

        return item === undefined ? false : item.parent !== 0;
      }

      return false;
    },
    hover: (dragItem, monitor) => {
      if (monitor.isOver({ shallow: true })) {
        console.log(getHoverIndex(null, ref.current, monitor, context));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }) && monitor.canDrop(),
      dragSource: monitor.getItem<NodeModel>(),
    }),
  });

  return [isOver, dragSource, drop];
};
