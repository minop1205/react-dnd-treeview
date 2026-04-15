import type { Meta } from "@storybook/react-vite";
import React from "react";
import { expect, within } from "storybook/test";
import { DndProvider, getBackendOptions, MultiBackend, Tree } from "~/index";
import * as argTypes from "~/stories/argTypes";
import { dragAndDrop, toggleNode } from "~/stories/examples/helpers";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import type { FileProperties } from "~/stories/types";
import type { TreeProps } from "~/types";
import { Template } from "./Template";

export default {
	component: Tree,
	title: "Advanced Examples/Multiple tree",
	argTypes,
	decorators: [
		(Story) => (
			<DndProvider backend={MultiBackend} options={getBackendOptions()}>
				<Story />
			</DndProvider>
		),
	],
} as Meta<TreeProps<FileProperties>>;

export const MultipleTreeStory = Template.bind({});

MultipleTreeStory.args = {};

MultipleTreeStory.storyName = "Multiple tree";

MultipleTreeStory.parameters = {
	csb: {
		jsId: "multiple-tree-js-216o5l",
		tsId: "multiple-tree-ts-6uysei",
	},
};

if (!interactionsDisabled) {
	MultipleTreeStory.play = async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await expect(canvas.queryByTestId("custom-drag-preview")).toBeNull();

		// drag and drop: File 3 (Tree:1) into root (Tree:2)
		{
			const dragSource = canvas.getByText("File 3 (Tree:1)");
			const dropTarget = canvas.getAllByRole("list")[1];

			await dragAndDrop(dragSource, dropTarget);

			await expect(
				canvas.getByTestId("tree2-custom-node-107"),
			).toBeInTheDocument();
			await expect(canvas.queryByTestId("tree1-custom-node-107")).toBeNull();
		}

		// drag and drop: Folder 1 (Tree:1) into Folder 2 (Tree:3)
		{
			const dragSource = canvas.getByText("Folder 1 (Tree:1)");
			const dropTarget = canvas.getByText("Folder 2 (Tree:3)");

			await dragAndDrop(dragSource, dropTarget);

			await expect(canvas.queryByTestId("tree3-custom-node-101")).toBeNull();

			await toggleNode(canvas.getByTestId("arrow-right-icon-304"));

			await expect(
				canvas.getByTestId("tree3-custom-node-101"),
			).toBeInTheDocument();
		}

		// drag and drop: File 3 (Tree:2) into Folder 1 (Tree:2)
		{
			const dragSource = canvas.getByText("File 3 (Tree:2)");
			const dropTarget = canvas.getByText("Folder 1 (Tree:2)");

			await dragAndDrop(dragSource, dropTarget);

			await expect(canvas.queryByTestId("tree2-custom-node-207")).toBeNull();

			await toggleNode(canvas.getByTestId("arrow-right-icon-201"));

			await expect(
				canvas.getByTestId("tree2-custom-node-207"),
			).toBeInTheDocument();
		}
	};
}
