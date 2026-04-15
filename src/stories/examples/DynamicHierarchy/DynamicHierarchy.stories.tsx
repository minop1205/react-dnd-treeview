import type { Meta } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import React from "react";
import { DndProvider, getBackendOptions, MultiBackend, Tree } from "~/index";
import * as argTypes from "~/stories/argTypes";
import sampleData from "~/stories/assets/dynamic-hierarchy.json";
import { DefaultTemplate } from "~/stories/examples/DefaultTemplate";
import { dragAndDrop, wait } from "~/stories/examples/helpers";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import type { FileProperties } from "~/stories/types";
import type { DragLayerMonitorProps, TreeProps } from "~/types";
import { CustomDragPreview } from "./CustomDragPreview";
import { CustomNode } from "./CustomNode";
import styles from "./DynamicHierarchy.module.css";

export default {
	component: Tree,
	title: "Basic Examples/Dynamic hierarchy",
	argTypes,
	decorators: [
		(Story) => (
			<DndProvider backend={MultiBackend} options={getBackendOptions()}>
				<Story />
			</DndProvider>
		),
	],
} as Meta<TreeProps<FileProperties>>;

export const DynamicHierarchyStory = DefaultTemplate.bind({});

DynamicHierarchyStory.args = {
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
	dragPreviewRender: (monitorProps: DragLayerMonitorProps<FileProperties>) => (
		<CustomDragPreview monitorProps={monitorProps} />
	),
};

DynamicHierarchyStory.storyName = "Dynamic hierarchy";

DynamicHierarchyStory.parameters = {
	csb: {
		jsId: "dynamic-hierarchy-js-n8m7zn",
		tsId: "dynamic-hierarchy-ts-dz4bis",
	},
};

if (!interactionsDisabled) {
	DynamicHierarchyStory.play = async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await expect(canvas.queryByTestId("arrow-right-icon-1")).toBeNull();

		// drag and drop: Item 2 into Item 1
		{
			await wait(500);
			await dragAndDrop(
				canvas.getByText("Item 2"),
				canvas.getByTestId("custom-node-1"),
			);

			await expect(canvas.queryByText("Item 2")).toBeNull();
			await userEvent.click(canvas.getByTestId("arrow-right-icon-1"));
			await expect(await canvas.findByText("Item 2")).toBeInTheDocument();
		}
	};
}
