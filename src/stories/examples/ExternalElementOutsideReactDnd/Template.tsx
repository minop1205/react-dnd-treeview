import type { StoryFn } from "@storybook/react";
import React, { useContext } from "react";
import { Tree } from "~/index";
import type { FileProperties } from "~/stories/types";
import type { TreeProps } from "~/types";
import type { StoryState } from "./StoryProvider";
import { StoryContext } from "./StoryProvider";

export const Template: StoryFn<TreeProps<FileProperties>> = (args) => {
	const storyContext = useContext(StoryContext) as StoryState;
	const { tree, handleDrop } = storyContext;

	return <Tree {...args} tree={tree} onDrop={handleDrop} />;
};
