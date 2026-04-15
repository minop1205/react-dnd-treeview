import { useContext } from "react";
import type { DragElementWrapper } from "react-dnd";
import { useDrop } from "react-dnd";
import { useTreeContext } from "~/hooks";
import { ItemTypes } from "~/ItemTypes";
import { PlaceholderContext } from "~/providers";
import type { DragItem, NativeDragItem, NodeModel } from "~/types";
import { getDropTarget, isDroppable, isNodeModel } from "~/utils";

export const useDropNode = <T>(
	item: NodeModel<T>,
	ref: React.RefObject<HTMLElement | null>,
): [boolean, NodeModel<T>, DragElementWrapper<HTMLElement>] => {
	const treeContext = useTreeContext<T>();
	const placeholderContext = useContext(PlaceholderContext);
	const [{ isOver, dragSource }, drop] = useDrop({
		accept: [ItemTypes.TREE_ITEM, ...treeContext.extraAcceptTypes],
		drop: (dragItem: DragItem<T> | NativeDragItem, monitor) => {
			const { dropTargetId, index } = placeholderContext;

			if (
				monitor.isOver({ shallow: true }) &&
				dropTargetId !== undefined &&
				index !== undefined
			) {
				// If the drag source is outside the react-dnd,
				// NativeDragItem is passed instead of DragItem.
				treeContext.onDrop(
					isNodeModel<T>(dragItem) ? dragItem : null,
					dropTargetId,
					index,
				);
			}

			placeholderContext.hidePlaceholder();
		},
		canDrop: (dragItem, monitor) => {
			if (monitor.isOver({ shallow: true })) {
				const dropTarget = getDropTarget<T>(
					item,
					ref.current,
					monitor,
					treeContext,
				);

				if (dropTarget === null) {
					return false;
				}

				return isDroppable(dragItem, dropTarget.id, treeContext);
			}

			return false;
		},
		hover: (dragItem, monitor) => {
			if (monitor.isOver({ shallow: true })) {
				const { dropTargetId, index, showPlaceholder, hidePlaceholder } =
					placeholderContext;

				const dropTarget = getDropTarget<T>(
					item,
					ref.current,
					monitor,
					treeContext,
				);

				if (
					dropTarget === null ||
					!isDroppable(dragItem, dropTarget.id, treeContext)
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
			const dragSource: NodeModel<T> = monitor.getItem();

			return {
				isOver: monitor.isOver({ shallow: true }) && monitor.canDrop(),
				dragSource,
			};
		},
	});

	return [isOver, dragSource, drop];
};
