import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import type { StoryFn } from "@storybook/react";
import React, { useState } from "react";
import { Tree } from "~/index";
import externalNodesJson from "~/stories/assets/external-nodes.json";
import type { FileProperties } from "~/stories/types";
import { useDropHandler } from "~/stories/useDropHandler";
import type { DropOptions, NodeModel, TreeProps } from "~/types";
import { DragLayer } from "./DragLayer";
import styles from "./ExternalElementInsideReactDnd.module.css";
import { ExternalNode } from "./ExternalNode";

export const Template: StoryFn<TreeProps<FileProperties>> = (args) => {
	const [tree, updateTree] = useDropHandler<FileProperties>(args);
	const [externalNodes, setExternalNodes] =
		useState<NodeModel<FileProperties>[]>(externalNodesJson);
	const [lastId, setLastId] = useState(105);

	const handleDrop = (
		newTree: NodeModel<FileProperties>[],
		options: DropOptions<FileProperties>,
	) => {
		const { dragSourceId } = options;

		updateTree(newTree, options);
		setExternalNodes(
			externalNodes.filter((exnode) => exnode.id !== dragSourceId),
		);
	};

	const handleAddExternalNode = () => {
		const node: NodeModel<FileProperties> = {
			id: lastId,
			parent: 0,
			text: `External node ${lastId - 100}`,
			data: {
				fileType: "text",
				fileSize: "1KB",
			},
		};

		setExternalNodes([...externalNodes, node]);
		setLastId(lastId + 1);
	};

	return (
		<>
			<DragLayer />
			<div className={styles.rootGrid}>
				<div className={styles.externalContainer}>
					<div>
						<Button
							variant="outlined"
							startIcon={<Add />}
							onClick={handleAddExternalNode}
						>
							Add node
						</Button>
					</div>
					<div>
						{externalNodes.map((node) => (
							<ExternalNode key={node.id} node={node} />
						))}
					</div>
				</div>
				<div>
					<Tree {...args} tree={tree} onDrop={handleDrop} />
				</div>
			</div>
		</>
	);
};
