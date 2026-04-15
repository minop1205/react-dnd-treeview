import type { Meta } from "@storybook/react-vite";
import React from "react";
import { expect, fireEvent, within } from "storybook/test";
import { DndProvider, getBackendOptions, MultiBackend, Tree } from "~/index";
import * as argTypes from "~/stories/argTypes";
import sampleData from "~/stories/assets/sample-default.json";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import { CustomNode } from "~/stories/examples/components/CustomNode";
import { DefaultTemplate } from "~/stories/examples/DefaultTemplate";
import {
	assertElementCoords,
	dragEnterAndDragOver,
	dragLeaveAndDragEnd,
	getPointerCoords,
	wait,
} from "~/stories/examples/helpers";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import type { FileProperties } from "~/stories/types";
import type { DragLayerMonitorProps, TreeProps } from "~/types";
import styles from "./CustomDragPreview.module.css";

export default {
	component: Tree,
	title: "Basic Examples/Custom drag preview",
	argTypes,
	decorators: [
		(Story) => (
			<DndProvider backend={MultiBackend} options={getBackendOptions()}>
				<Story />
			</DndProvider>
		),
	],
} as Meta<TreeProps<FileProperties>>;

export const CustomDragPreviewStory = DefaultTemplate.bind({});

CustomDragPreviewStory.args = {
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

CustomDragPreviewStory.storyName = "Custom drag preview";

CustomDragPreviewStory.parameters = {
	csb: {
		jsId: "custom-drag-preview-js-s53fmx",
		tsId: "custom-drag-preview-ts-ibvb07",
	},
};

if (!interactionsDisabled) {
	CustomDragPreviewStory.play = async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await expect(canvas.queryByTestId("custom-drag-preview")).toBeNull();

		// show preview during dragging
		const dragSource = canvas.getByText("File 3");
		const dropTarget = canvas.getByTestId("custom-node-1");

		await wait();

		await fireEvent.dragStart(dragSource);

		const coords = getPointerCoords(dropTarget);
		await dragEnterAndDragOver(dropTarget, coords);

		await expect(
			await canvas.findByTestId("custom-drag-preview"),
		).toBeInTheDocument();

		await assertElementCoords(
			canvas.getByTestId("custom-drag-preview"),
			32,
			32,
		);

		// hide preview when drag is canceled
		await dragLeaveAndDragEnd(dragSource, dropTarget);

		await wait();

		await expect(canvas.queryByTestId("custom-drag-preview")).toBeNull();
	};
}
