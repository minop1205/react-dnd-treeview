import React from "react";
import type { DragLayerMonitorProps } from "~/types";
import type { FileProperties } from "../../types";
import styles from "./CustomDragPreview.module.css";
import { TypeIcon } from "./TypeIcon";

type Props = {
	monitorProps: DragLayerMonitorProps<FileProperties>;
};

export const CustomDragPreview: React.FC<Props> = (props) => {
	const item = props.monitorProps.item;

	return (
		<div className={styles.root} data-testid="custom-drag-preview">
			<div className={styles.icon}>
				<TypeIcon
					droppable={item.droppable || false}
					fileType={item?.data?.fileType}
				/>
			</div>
			<div className={styles.label}>{item.text}</div>
		</div>
	);
};
