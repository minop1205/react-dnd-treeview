import type { Meta } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import React from "react";
import { DndProvider, getBackendOptions, MultiBackend, Tree } from "~/index";
import * as argTypes from "~/stories/argTypes";
import sampleData from "~/stories/assets/sample-default.json";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import { CustomNode } from "~/stories/examples/components/CustomNode";
import { toggleNode, wait } from "~/stories/examples/helpers";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import type { FileProperties } from "~/stories/types";
import type { TreeProps } from "~/types";
import styles from "./AddRemoveDuplicateNodes.module.css";
import { Template } from "./Template";

export default {
	component: Tree,
	title: "Basic Examples/Add, remove, duplicate nodes",
	argTypes,
	decorators: [
		(Story) => (
			<DndProvider backend={MultiBackend} options={getBackendOptions()}>
				<Story />
			</DndProvider>
		),
	],
} as Meta<TreeProps<FileProperties>>;

export const AddRemoveDuplicateNodesStory = Template.bind({});

AddRemoveDuplicateNodesStory.args = {
	rootId: 0,
	tree: sampleData,
	classes: {
		root: styles.treeRoot,
		draggingSource: styles.draggingSource,
		dropTarget: styles.dropTarget,
	},
	render: function render(node, options) {
		return <CustomNode node={node} {...options} />;
	},
	dragPreviewRender: (monitorProps) => (
		<CustomDragPreview monitorProps={monitorProps} />
	),
};

AddRemoveDuplicateNodesStory.storyName = "Add, remove, duplicate nodes";

AddRemoveDuplicateNodesStory.parameters = {
	csb: {
		jsId: "add-remove-duplicate-js-u9v93e",
		tsId: "add-remove-duplicate-ts-8q20pd",
	},
};

if (!interactionsDisabled) {
	AddRemoveDuplicateNodesStory.play = async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await wait();

		// add new node named File4 to root
		{
			await userEvent.click(canvas.getByTestId("btn-add"));
			await wait();

			const dialog = within(await canvas.findByTestId("dialog"));

			await userEvent.click(dialog.getByTestId("dialog-input-text"));
			await userEvent.type(dialog.getByTestId("dialog-input-text"), "File 4");
			await userEvent.click(dialog.getByText(/submit/i));
		}

		expect(await canvas.findByText("File 4"));

		// delete Folder 1
		await userEvent.hover(canvas.getByTestId("custom-node-1"));
		await userEvent.click(await canvas.findByTestId("btn-delete-1"));
		await wait();
		await expect(canvas.queryByText("Folder 1")).toBeNull();

		// copy Folder 2
		await userEvent.hover(canvas.getByTestId("custom-node-4"));
		await userEvent.click(await canvas.findByTestId("btn-copy-4"));
		await userEvent.unhover(canvas.getByTestId("custom-node-4"));
		await toggleNode(await canvas.findByTestId("arrow-right-icon-12"));
		await toggleNode(await canvas.findByTestId("arrow-right-icon-13"));
		await expect(await canvas.findByText("File 2-1-1")).toBeInTheDocument();
	};
}
