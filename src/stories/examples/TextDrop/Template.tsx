import type { StoryFn } from "@storybook/react";
import React, { useState } from "react";
import { NativeTypes } from "react-dnd-html5-backend";
import { Tree } from "~/index";
import type { FileProperties } from "~/stories/types";
import type {
	DropOptions,
	NativeDragItem,
	NodeModel,
	TreeProps,
} from "~/types";
import { MockText } from "./MockText";
import styles from "./TextDrop.module.css";

export const Template: StoryFn<TreeProps<FileProperties>> = (args) => {
	const [tree, setTree] = useState<NodeModel<FileProperties>[]>(args.tree);
	const [lastId, setLastId] = useState(105);

	const handleDrop = (
		newTree: NodeModel<FileProperties>[],
		options: DropOptions<FileProperties>,
	) => {
		const { dropTargetId, monitor } = options;
		const dragSource = monitor.getItem() as
			| NodeModel<FileProperties>
			| NativeDragItem;
		const itemType = monitor.getItemType();
		let mergedTree = [...newTree];

		if ("dataTransfer" in dragSource) {
			if (itemType === NativeTypes.TEXT && dragSource.text !== undefined) {
				const text = dragSource.text;

				mergedTree = [
					...newTree,
					{
						id: lastId,
						parent: dropTargetId,
						text,
						data: {
							fileSize: "1KB",
							fileType: "text",
						},
					},
				];

				setLastId(lastId + 1);
			} else if (
				itemType === NativeTypes.HTML &&
				dragSource.html !== undefined
			) {
				const html = dragSource.html;
				const tempEl = document.createElement("div");
				tempEl.innerHTML = html;
				const text = tempEl.textContent as string;

				mergedTree = [
					...newTree,
					{
						id: lastId,
						parent: dropTargetId,
						text,
						data: {
							fileSize: "1KB",
							fileType: "text",
						},
					},
				];

				setLastId(lastId + 1);
			}
		}

		setTree(mergedTree);
		args.onDrop(mergedTree, options);
	};

	return (
		<div className={styles.rootGrid}>
			<div className={styles.textareaWrapper}>
				<textarea
					className={styles.textarea}
					defaultValue="You can select text in this text field and drop a substring into the tree."
				/>
				<MockText />
			</div>
			<Tree {...args} tree={tree} onDrop={handleDrop} />
		</div>
	);
};
