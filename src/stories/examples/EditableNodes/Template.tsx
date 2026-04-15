import type { StoryFn } from "@storybook/react";
import React, { useState } from "react";
import type { FileProperties } from "~/stories/types";
import { Tree } from "~/Tree";
import type { DropOptions, NodeModel, TreeProps } from "~/types";
import { CustomNode } from "./CustomNode";

export const Template: StoryFn<TreeProps<FileProperties>> = (args) => {
	const [tree, setTree] = useState<NodeModel<FileProperties>[]>(args.tree);

	const handleDrop = (
		newTree: NodeModel<FileProperties>[],
		options: DropOptions<FileProperties>,
	) => {
		args.onDrop(newTree, options);
		setTree(newTree);
	};

	const handleTextChange = (id: NodeModel["id"], value: string) => {
		const newTree = tree.map((node) => {
			if (node.id === id) {
				return {
					...node,
					text: value,
				};
			}

			return node;
		});

		setTree(newTree);
	};

	return (
		<Tree
			{...args}
			tree={tree}
			onDrop={handleDrop}
			render={(
				node: NodeModel<FileProperties>,
				{ depth, isOpen, onToggle },
			) => (
				<CustomNode
					node={node}
					depth={depth}
					isOpen={isOpen}
					onToggle={onToggle}
					onTextChange={handleTextChange}
				/>
			)}
		/>
	);
};
