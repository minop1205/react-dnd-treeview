import type { Meta } from "@storybook/react";
import React from "react";
import { DndProvider, getBackendOptions, MultiBackend, Tree } from "~/index";
import * as argTypes from "~/stories/argTypes";
import type { FileProperties } from "~/stories/types";
import type { TreeProps } from "~/types";
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
	csb: {
		tsId: "directory-structure-ts-dv8kz4",
		jsId: "directory-structure-js-6ws6mf",
	},
};
