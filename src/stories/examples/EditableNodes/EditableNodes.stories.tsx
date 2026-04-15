import type { Meta } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import React from "react";
import { DndProvider, getBackendOptions, MultiBackend, Tree } from "~/index";
import * as argTypes from "~/stories/argTypes";
import sampleData from "~/stories/assets/sample-default.json";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import { toggleNode, wait } from "~/stories/examples/helpers";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import type { FileProperties } from "~/stories/types";
import type { DragLayerMonitorProps, TreeProps } from "~/types";
import styles from "./EditableNodes.module.css";
import { Template } from "./Template";

export default {
	component: Tree,
	title: "Basic Examples/Editable nodes",
	argTypes,
	decorators: [
		(Story) => (
			<DndProvider backend={MultiBackend} options={getBackendOptions()}>
				<Story />
			</DndProvider>
		),
	],
} as Meta<TreeProps<FileProperties>>;

export const EditableNodesStory = Template.bind({});

EditableNodesStory.args = {
	rootId: 0,
	tree: sampleData,
	classes: {
		root: styles.treeRoot,
		draggingSource: styles.draggingSource,
		dropTarget: styles.dropTarget,
	},
	dragPreviewRender: (monitorProps: DragLayerMonitorProps<FileProperties>) => (
		<CustomDragPreview monitorProps={monitorProps} />
	),
};

EditableNodesStory.storyName = "Editable nodes";

EditableNodesStory.parameters = {
	csb: {
		jsId: "editable-js-gdszw4",
		tsId: "editable-ts-4v1034",
	},
};

if (!interactionsDisabled) {
	EditableNodesStory.play = async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// open Folder2 and Folder2-1
		await toggleNode(await canvas.findByTestId("arrow-right-icon-4"));
		await toggleNode(await canvas.findByTestId("arrow-right-icon-5"));

		// open text field of File2-1-1
		await userEvent.click(await canvas.findByTestId("btn-edit-6"));

		// hover on text field
		await userEvent.hover(await canvas.findByTestId("input-6"));
		await wait();

		// all nodes will be undraggable when hover on text field in the node
		const nodes = await canvas.findAllByRole("listitem");
		for (const node of nodes) {
			await expect(node.draggable).toBe(false);
		}
	};
}
