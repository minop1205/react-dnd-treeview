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
    canDrop: (item: DragItem) => {
      const { tree, canDrop } = context;
      const dragItem = tree.find((node) => node.id === item.id);

      if (canDrop && dragItem) {
        return canDrop(dragItem.id, parentId);
      }

      return dragItem === undefined ? false : dragItem.parent !== 0;
    },
    hover: (dragItem, monitor) => {
      if (monitor.isOver({ shallow: true })) {
        console.log("root hover");
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }) && monitor.canDrop(),
    }),
  });

  return [isOver, drop];
};
