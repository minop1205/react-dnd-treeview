import React, { useContext } from "react";
import { Story } from "@storybook/react";
import { Tree } from "~/index";
import { StoryContext, StoryState } from "./StoryProvider";
import type { TreeProps } from "~/types";
import type { FileProperties } from "~/stories/types";

export const Template: Story<TreeProps<FileProperties>> = (args) => {
  const storyContext = useContext(StoryContext) as StoryState;
  const { tree, handleDrop } = storyContext;

  return <Tree {...args} tree={tree} onDrop={handleDrop} />;
};
