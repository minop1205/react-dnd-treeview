import React from "react";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import { CustomNode } from "~/stories/examples/components/CustomNode";
import type { FileProperties } from "~/stories/types";
import { Tree } from "~/Tree";
import type { TreeProps } from "~/types";
import styles from "./TreeView.module.css";

type Props<T> = Pick<TreeProps<T>, "tree" | "onDrop" | "rootId"> & {
	testIdPrefix: string;
};

export const TreeView: React.FC<Props<FileProperties>> = (props) => (
	<Tree
		tree={props.tree}
		onDrop={props.onDrop}
		rootId={props.rootId}
		classes={{
			root: styles.treeRoot,
			draggingSource: styles.draggingSource,
			dropTarget: styles.dropTarget,
		}}
		render={(node, options) => (
			<CustomNode node={node} testIdPrefix={props.testIdPrefix} {...options} />
		)}
		dragPreviewRender={(monitorProps) => (
			<CustomDragPreview monitorProps={monitorProps} />
		)}
	/>
);
