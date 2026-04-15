import React from "react";
import { useDragLayer } from "react-dnd";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import type { FileProperties } from "~/stories/types";
import type { DragItem, DragLayerMonitorProps } from "~/types";

const rootStyle: React.CSSProperties = {
	height: "100%",
	left: 0,
	pointerEvents: "none",
	position: "fixed",
	top: 0,
	width: "100%",
	zIndex: 100,
};

const getItemStyles = <T,>(
	monitorProps: DragLayerMonitorProps<T>,
): React.CSSProperties => {
	const offset = monitorProps.clientOffset;

	if (!offset) {
		return {};
	}

	const { x, y } = offset;
	const transform = `translate(${x}px, ${y}px)`;

	return {
		pointerEvents: "none",
		transform,
	};
};

export const DragLayer: React.FC = () => {
	const monitorProps = useDragLayer((monitor) => {
		const item: DragItem<FileProperties> = monitor.getItem();

		return {
			item,
			clientOffset: monitor.getClientOffset(),
			isDragging: monitor.isDragging(),
		};
	});

	const { item, isDragging, clientOffset } = monitorProps;

	if (!item || !isDragging || !clientOffset) {
		return null;
	}

	return (
		<div style={rootStyle}>
			<div style={getItemStyles(monitorProps)}>
				<CustomDragPreview monitorProps={monitorProps} />
			</div>
		</div>
	);
};
