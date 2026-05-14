import type { Meta } from "@storybook/react-vite";
import React from "react";
import { expect, userEvent, within } from "storybook/test";
import { DndProvider, getBackendOptions, MultiBackend, Tree } from "~/index";
import * as argTypes from "~/stories/argTypes";
import { wait } from "~/stories/examples/helpers";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
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

if (!interactionsDisabled) {
	DirectoryStructureStory.play = async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Initial state: only top-level nodes are visible
		await expect(canvas.getByText("Folder 1")).toBeInTheDocument();
		await expect(canvas.getByText("Folder 2")).toBeInTheDocument();
		await expect(canvas.getByText("File 3")).toBeInTheDocument();
		await expect(canvas.queryByText("File 1-1")).toBeNull();
		await expect(canvas.queryByText("File 1-2")).toBeNull();

		// Click Folder 1 to open it
		await userEvent.click(canvas.getByText("Folder 1"));
		await wait();
		await expect(canvas.getByText("File 1-1")).toBeInTheDocument();
		await expect(canvas.getByText("File 1-2")).toBeInTheDocument();

		// Click Folder 1 again to close it
		await userEvent.click(canvas.getByText("Folder 1"));
		await wait(300);
		await expect(canvas.queryByText("File 1-1")).toBeNull();
		await expect(canvas.queryByText("File 1-2")).toBeNull();

		// Open Folder 2, then Folder 2-1 to verify nested nodes
		await userEvent.click(canvas.getByText("Folder 2"));
		await wait();
		await expect(canvas.getByText("Folder 2-1")).toBeInTheDocument();
		await expect(canvas.queryByText("File 2-1-1")).toBeNull();

		await userEvent.click(canvas.getByText("Folder 2-1"));
		await wait();
		await expect(canvas.getByText("File 2-1-1")).toBeInTheDocument();
	};
}
