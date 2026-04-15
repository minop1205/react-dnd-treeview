import type { Meta } from "@storybook/react";
import { expect, within } from "@storybook/test";
import React from "react";
import { DndProvider, getBackendOptions, MultiBackend, Tree } from "~/index";
import * as argTypes from "~/stories/argTypes";
import sampleData from "~/stories/assets/sample-default.json";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import { CustomNode } from "~/stories/examples/components/CustomNode";
import { DefaultTemplate } from "~/stories/examples/DefaultTemplate";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import type { FileProperties } from "~/stories/types";
import type { DragLayerMonitorProps, TreeProps } from "~/types";
import styles from "./OpenSpecificParentNodesInitially.module.css";

export default {
	component: Tree,
	title: "Basic Examples/Open specific parent nodes initially",
	argTypes,
	decorators: [
		(Story) => (
			<DndProvider backend={MultiBackend} options={getBackendOptions()}>
				<Story />
			</DndProvider>
		),
	],
} as Meta<TreeProps<FileProperties>>;

export const OpenSpecificParentNodesInitially = DefaultTemplate.bind({});

OpenSpecificParentNodesInitially.args = {
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
	initialOpen: [1, 5],
};

OpenSpecificParentNodesInitially.storyName =
	"Open specific parent nodes initially";

OpenSpecificParentNodesInitially.parameters = {
	csb: {
		jsId: "open-specific-parent-nodes-initially-js-forked-tz2y6f",
		tsId: "open-specific-parent-nodes-initially-ts-forked-kyh3h7",
	},
};

if (!interactionsDisabled) {
	OpenSpecificParentNodesInitially.play = async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await expect(canvas.getByText("File 1-1")).toBeInTheDocument();
		await expect(canvas.getByText("File 1-2")).toBeInTheDocument();
		await expect(canvas.queryByText("Folder 2-1")).toBeNull();
		await expect(canvas.queryByText("File 2-1-1")).toBeNull();
	};
}
