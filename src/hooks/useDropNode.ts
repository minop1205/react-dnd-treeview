import { useContext } from "react";
import { useDrop, DragElementWrapper } from "react-dnd";
import { ItemTypes } from "../ItemTypes";
import { PlaceholderContext } from "../providers";
import { NodeModel, DragItem } from "../types";
import { isDroppable, getHoverIndex } from "../utils";
import { useTreeContext } from "../hooks";

export const useDropNode = <T>(
  item: NodeModel<T>,
  ref: React.RefObject<HTMLElement>
): [boolean, NodeModel, DragElementWrapper<HTMLElement>] => {
  const treeContext = useTreeContext<T>();
  const placeholderContext = useContext(PlaceholderContext);
  const [{ isOver, dragSource }, drop] = useDrop({
    accept: ItemTypes.TREE_ITEM,
    drop: (dragSource: DragItem<T>, monitor) => {
      const { parentId, index } = placeholderContext;

      if (
        monitor.isOver({ shallow: true }) &&
        parentId !== undefined &&
        index !== undefined
      ) {
        treeContext.onDrop(dragSource.id, parentId, index);
      }
    },
    canDrop: (dragSource: DragItem<T>, monitor) => {
      if (monitor.isOver({ shallow: true })) {
        const hoverIndex = getHoverIndex<T>(
          item,
          ref.current,
          monitor,
          treeContext
        );

        if (hoverIndex === null) {
          return false;
        }

        return isDroppable(dragSource.id, hoverIndex.parentId, treeContext);
      }

      return false;
    },
    hover: (dragSource, monitor) => {
      if (monitor.isOver({ shallow: true })) {
        const { parentId, index, showPlaceholder, hidePlaceholder } =
          placeholderContext;

        const hoverIndex = getHoverIndex<T>(
          item,
          ref.current,
          monitor,
          treeContext
        );

        if (
          hoverIndex === null ||
          !isDroppable(dragSource.id, hoverIndex.parentId, treeContext)
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
