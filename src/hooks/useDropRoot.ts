import { useContext } from "react";
import { useDrop, DragElementWrapper } from "react-dnd";
import { ItemTypes } from "../ItemTypes";
import { PlaceholderContext } from "../providers";
import { NodeModel, DragItem } from "../types";
import { getDropTarget, isDroppable } from "../utils";
import { useTreeContext } from "../hooks";

export const useDropRoot = <T>(
  ref: React.RefObject<HTMLElement>
): [boolean, NodeModel, DragElementWrapper<HTMLElement>] => {
  const treeContext = useTreeContext<T>();
  const placeholderContext = useContext(PlaceholderContext);
  const [{ isOver, dragSource }, drop] = useDrop({
    accept: ItemTypes.TREE_ITEM,
    drop: (item: DragItem<T>, monitor) => {
      const { rootId, onDrop } = treeContext;
      const { parentId, index } = placeholderContext;

      if (
        monitor.isOver({ shallow: true }) &&
        parentId !== undefined &&
        index !== undefined
      ) {
        onDrop(item.id, rootId, index);
      }

      placeholderContext.hidePlaceholder();
    },
    canDrop: (item: DragItem<T>, monitor) => {
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

        const hoverIndex = getDropTarget<T>(
          null,
          ref.current,
          monitor,
          treeContext
        );

        if (
          hoverIndex === null ||
          !isDroppable(dragItem.id, rootId, treeContext)
        ) {
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
