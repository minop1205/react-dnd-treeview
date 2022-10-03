import React from "react";
import { DragLayerMonitorProps } from "~/types";
import { FileProperties } from "~/stories/types";
import styles from "./CustomDragPreview.module.css";

type Props = {
  monitorProps: DragLayerMonitorProps<FileProperties>;
};

export const CustomDragPreview: React.FC<Props> = (props) => {
  const item = props.monitorProps.item;

  return (
    <div className={styles.root} data-testid="custom-drag-preview">
      {item.text}
    </div>
  );
};
