import { useDragLayer } from "react-dnd";
import { ItemTypes } from "../ItemTypes";
import { DragItem, DragLayerMonitorProps } from "../types";

export const useTreeDragLayer = <T>(): DragLayerMonitorProps<T> => {
  return useDragLayer((monitor) => {
    const itemType = monitor.getItemType();

    return {
      item: monitor.getItem() as DragItem<T>,
      clientOffset: monitor.getClientOffset(),
      isDragging: monitor.isDragging() && itemType === ItemTypes.TREE_ITEM,
    };
  });
};
