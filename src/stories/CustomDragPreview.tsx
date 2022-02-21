import React from "react";
import { DragLayerMonitorProps } from "~/types";
import { FileProperties } from "./types";
import { TypeIcon } from "./TypeIcon";

type Props = {
  monitorProps: DragLayerMonitorProps<FileProperties>;
};

export const CustomDragPreview: React.FC<Props> = (props) => {
  const item = props.monitorProps.item;

  return (
    <div className="custom-drag-preview">
      <div className="custom-drag-preview__icon">
        <TypeIcon
          droppable={item.droppable || false}
          fileType={item?.data?.fileType}
        />
      </div>
      <div className="custom-drag-preview__label">{item.text}</div>
    </div>
  );
};
