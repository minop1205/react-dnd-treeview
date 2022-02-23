import React from "react";
import { Story } from "@storybook/react";
import { Tree } from "~/Tree";
import { TreeProps } from "~/types";
import { useDropHandler } from "~/stories/useDropHandler";
import { FileProperties } from "~/stories/types";

export const DefaultTemplate: Story<TreeProps<FileProperties>> = (args) => {
  const [tree, handleDrop] = useDropHandler<FileProperties>(args);
  return <Tree {...args} tree={tree} onDrop={handleDrop} />;
};
