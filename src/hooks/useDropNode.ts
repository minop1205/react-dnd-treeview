import { useContext } from "react";
import { useDrop, DragElementWrapper } from "react-dnd";
import { ItemTypes } from "../ItemTypes";
import { PlaceholderContext } from "../providers";
import { NodeModel, DragItem } from "../types";
import { isDroppable, getDropTarget } from "../utils";
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
      const { dropTargetId, index } = placeholderContext;

      if (
        monitor.isOver({ shallow: true }) &&
        dropTargetId !== undefined &&
        index !== undefined
      ) {
        treeContext.onDrop(dragSource.id, dropTargetId, index);
      }

      placeholderContext.hidePlaceholder();
    },
    canDrop: (dragSource: DragItem<T>, monitor) => {
      if (monitor.isOver({ shallow: true })) {
        const dropTarget = getDropTarget<T>(
          item,
          ref.current,
          monitor,
          treeContext
        );

        if (dropTarget === null) {
          return false;
        }

        return isDroppable(dragSource.id, dropTarget.id, treeContext);
      }

      return false;
    },
    hover: (dragSource, monitor) => {
      if (monitor.isOver({ shallow: true })) {
        const { dropTargetId, index, showPlaceholder, hidePlaceholder } =
          placeholderContext;

        const dropTarget = getDropTarget<T>(
          item,
          ref.current,
          monitor,
          treeContext
        );

        if (
          dropTarget === null ||
          !isDroppable(dragSource.id, dropTarget.id, treeContext)
        ) {
          hidePlaceholder();
          return;
        }

        if (dropTarget.id !== dropTargetId || dropTarget.index !== index) {
          showPlaceholder(dropTarget.id, dropTarget.index);
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
