import React from "react";
import { Meta } from "@storybook/react";
import { DndProvider, MultiBackend, getBackendOptions, Tree } from "~/index";
import { pageFactory } from "~/stories/pageFactory";
import * as argTypes from "~/stories/argTypes";
import { TreeProps } from "~/types";
import { FileProperties } from "~/stories/types";

import Template from "./Template";

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
  docs: {
    page: pageFactory({
      tsId: "directory-structure-ts-35p68l",
      jsId: "directory-structure-js-ctx1cq",
    }),
  },
};
