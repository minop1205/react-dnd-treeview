import { Meta } from "@storybook/react";
import * as argTypes from "./argTypes";
import { Tree } from "../Tree";
import { TreeProps } from "../types";
import { FileProperties } from "./types";

export default {
  component: Tree,
  title: "Tree",
  argTypes,
} as Meta<TreeProps<FileProperties>>;

export { MinimumConfigurationStory } from "./MinimumConfigurationStory";
export { CustomNodeStory } from "./CustomNodeStory";
