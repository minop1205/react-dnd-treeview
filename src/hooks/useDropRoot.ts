import { useContext } from "react";
import { useDrop, DragElementWrapper } from "react-dnd";
import { ItemTypes } from "../ItemTypes";
import { TreeContext, PlaceholderContext } from "../providers";
import { NodeModel, DragItem } from "../types";
import { getHoverIndex, isDroppable } from "../utils";

export const useDropRoot = (
  ref: React.RefObject<HTMLElement>
): [boolean, NodeModel, DragElementWrapper<HTMLElement>] => {
  const treeContext = useContext(TreeContext);
  const placeholderContext = useContext(PlaceholderContext);
  const [{ isOver, dragSource }, drop] = useDrop({
    accept: ItemTypes.TREE_ITEM,
    drop: (item: DragItem, monitor) => {
      const { rootId, onDrop } = treeContext;

      if (monitor.isOver({ shallow: true })) {
        onDrop(item.id, rootId);
      }
    },
    canDrop: (item: DragItem, monitor) => {
      const { rootId } = treeContext;

      if (monitor.isOver({ shallow: true })) {
        if (item === undefined) {
          return false;
        }

        return isDroppable(item.id, rootId, treeContext);
      }

      return false;
    },
    hover: (dragItem, monitor) => {
      if (monitor.isOver({ shallow: true })) {
        const { rootId } = treeContext;
        const { parentId, index, showPlaceholder, hidePlaceholder } =
          placeholderContext;

        if (!isDroppable(dragItem.id, rootId, treeContext)) {
          hidePlaceholder();
          return;
        }

        const hoverIndex = getHoverIndex(
          null,
          ref.current,
          monitor,
          treeContext
        );

        if (hoverIndex === null) {
          hidePlaceholder();
          return;
        }

        if (hoverIndex.parentId !== parentId || hoverIndex.index !== index) {
          showPlaceholder(hoverIndex.parentId, hoverIndex.index);
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }) && monitor.canDrop(),
      dragSource: monitor.getItem<NodeModel>(),
    }),
  });

  return [isOver, dragSource, drop];
};
