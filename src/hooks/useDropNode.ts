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
  const treeContext = useContext(TreeContext);
  const [{ isOver, dragSource }, drop] = useDrop({
    accept: ItemTypes.TREE_ITEM,
    drop: (dragSource: DragItem, monitor) => {
      if (monitor.isOver({ shallow: true })) {
        treeContext.onDrop(dragSource.id, item.id);
      }
    },
    canDrop: (dragSource: DragItem, monitor) => {
      if (monitor.isOver({ shallow: true })) {
        return isDroppable(dragSource.id, item.id, treeContext);
      }

      return false;
    },
    hover: (dragSource, monitor) => {
      if (monitor.isOver({ shallow: true })) {
        console.log(getHoverIndex(item, ref.current, monitor, treeContext));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }) && monitor.canDrop(),
      dragSource: monitor.getItem<NodeModel>(),
    }),
  });

  return [isOver, dragSource, drop];
};
