import type { StoryFn } from "@storybook/react";
import React, { useState } from "react";
import sampleData from "~/stories/assets/multiple-tree.json";
import type { FileProperties } from "~/stories/types";
import type { DropOptions, NodeModel } from "~/types";
import { getDescendants } from "~/utils";
import styles from "./MultipleTree.module.css";
import { TreeView } from "./TreeView";

export const Template: StoryFn = () => {
	const [treeData, setTreeData] =
		useState<NodeModel<FileProperties>[]>(sampleData);
	const handleDrop = (
		newTree: NodeModel[],
		{ dragSourceId, dropTargetId }: DropOptions,
	) => {
		setTreeData(
			treeData.map((node) => {
				if (node.id === dragSourceId) {
					return {
						...node,
						parent: dropTargetId,
					};
				}

				return node;
			}),
		);
	};

	const tree1 = getDescendants(treeData, 100);
	const tree2 = getDescendants(treeData, 200);
	const tree3 = getDescendants(treeData, 300);

	return (
		<div className={styles.rootGrid}>
			<div className={styles.column}>
				<TreeView
					tree={tree1}
					onDrop={handleDrop}
					rootId={100}
					testIdPrefix="tree1-"
				/>
			</div>
			<div className={styles.column}>
				<TreeView
					tree={tree2}
					onDrop={handleDrop}
					rootId={200}
					testIdPrefix="tree2-"
				/>
			</div>
			<div className={styles.column}>
				<TreeView
					tree={tree3}
					onDrop={handleDrop}
					rootId={300}
					testIdPrefix="tree3-"
				/>
			</div>
		</div>
	);
};
