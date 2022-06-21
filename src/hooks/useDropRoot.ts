import { useContext } from "react";
import { useDrop, DragElementWrapper } from "react-dnd";
import { ItemTypes } from "~/ItemTypes";
import { PlaceholderContext } from "~/providers";
import { NodeModel, DragItem } from "~/types";
import { getDropTarget, isDroppable } from "~/utils";
import { useTreeContext } from "~/hooks";

export const useDropRoot = <T>(
  ref: React.RefObject<HTMLElement>
): [boolean, NodeModel, DragElementWrapper<HTMLElement>] => {
  const treeContext = useTreeContext<T>();
  const placeholderContext = useContext(PlaceholderContext);
  const [{ isOver, dragSource }, drop] = useDrop({
    accept: [ItemTypes.TREE_ITEM, ...treeContext.extraAcceptTypes],
    drop: (dragItem: DragItem<T>, monitor) => {
      const { rootId, onDrop } = treeContext;
      const { dropTargetId, index } = placeholderContext;

      if (
        monitor.isOver({ shallow: true }) &&
        dropTargetId !== undefined &&
        index !== undefined
      ) {
        onDrop(dragItem, rootId, index);
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
        const { dropTargetId, index, showPlaceholder, hidePlaceholder } =
          placeholderContext;

        const dropTarget = getDropTarget<T>(
          null,
          ref.current,
          monitor,
          treeContext
        );

        if (
          dropTarget === null ||
          !isDroppable(dragItem.id, rootId, treeContext)
        ) {
          hidePlaceholder();
          return;
        }

        if (dropTarget.id !== dropTargetId || dropTarget.index !== index) {
          showPlaceholder(dropTarget.id, dropTarget.index);
        }
      }
    },
    collect: (monitor) => {
      const dragSource: NodeModel = monitor.getItem();

      return {
        isOver: monitor.isOver({ shallow: true }) && monitor.canDrop(),
        dragSource,
      };
    },
  });

  return [isOver, dragSource, drop];
};
