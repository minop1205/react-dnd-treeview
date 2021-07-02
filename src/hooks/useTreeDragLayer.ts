import { useDragLayer } from "react-dnd";
import { ItemTypes } from "../ItemTypes";
import { DragItem, DragLayerMonitorProps } from "../types";

export const useTreeDragLayer = (): DragLayerMonitorProps => {
  return useDragLayer((monitor) => {
    const itemType = monitor.getItemType();

    return {
      item: monitor.getItem() as DragItem,
      clientOffset: monitor.getClientOffset(),
      isDragging: monitor.isDragging() && itemType === ItemTypes.TREE_ITEM,
    };
  });
};
