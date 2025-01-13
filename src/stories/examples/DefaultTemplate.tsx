import React from "react";
import { Tree } from "~/Tree";
import { useDropHandler } from "~/stories/useDropHandler";
import type { StoryFn } from "@storybook/react";
import type { FileProperties } from "~/stories/types";
import type { TreeProps } from "~/types";

export const DefaultTemplate: StoryFn<TreeProps<FileProperties>> = (args) => {
  const [tree, handleDrop] = useDropHandler<FileProperties>(args);
  return <Tree {...args} tree={tree} onDrop={handleDrop} />;
};
