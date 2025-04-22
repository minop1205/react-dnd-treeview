import React from "react";
import { DndProvider, MultiBackend, getBackendOptions, Tree } from "~/index";
import * as argTypes from "~/stories/argTypes";
import Template from "./Template";
import type { Meta } from "@storybook/react";
import type { FileProperties } from "~/stories/types";
import type { TreeProps } from "~/types";

export default {
  component: Tree,
  title: "Basic Examples/Directory structure",
  argTypes,
  decorators: [
    (Story) => (
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Story />
      </DndProvider>
    ),
  ],
} as Meta<TreeProps<FileProperties>>;

export const DirectoryStructureStory = Template.bind({});

DirectoryStructureStory.storyName = "Directory structure";

DirectoryStructureStory.parameters = {
  csb: {
    tsId: "directory-structure-ts-dv8kz4",
    jsId: "directory-structure-js-6ws6mf",
  },
};
