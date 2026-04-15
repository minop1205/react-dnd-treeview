import type { StoryFn } from "@storybook/react";
import React from "react";
import type { FileProperties } from "~/stories/types";
import { useDropHandler } from "~/stories/useDropHandler";
import { Tree } from "~/Tree";
import type { TreeProps } from "~/types";

export const DefaultTemplate: StoryFn<TreeProps<FileProperties>> = (args) => {
	const [tree, handleDrop] = useDropHandler<FileProperties>(args);
	return <Tree {...args} tree={tree} onDrop={handleDrop} />;
};
