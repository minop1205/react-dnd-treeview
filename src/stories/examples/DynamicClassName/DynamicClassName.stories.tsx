import type { Meta } from "@storybook/react";
import { expect, within } from "@storybook/test";
import React from "react";
import { DndProvider, getBackendOptions, MultiBackend, Tree } from "~/index";
import * as argTypes from "~/stories/argTypes";
import sampleData from "~/stories/assets/sample-default.json";
import { CustomNode } from "~/stories/examples/components/CustomNode";
import { DefaultTemplate } from "~/stories/examples/DefaultTemplate";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import type { FileProperties } from "~/stories/types";
import type { DragLayerMonitorProps, TreeProps } from "~/types";
import { CustomDragPreview } from "./CustomDragPreview";
import styles from "./DynamicClassName.module.css";

export default {
	component: Tree,
	title: "Basic Examples/Dynamic class name",
	argTypes,
	decorators: [
		(Story) => (
			<DndProvider backend={MultiBackend} options={getBackendOptions()}>
				<Story />
			</DndProvider>
		),
	],
} as Meta<TreeProps<FileProperties>>;

export const DynamicClassNameStory = DefaultTemplate.bind({});

DynamicClassNameStory.args = {
	rootId: 0,
	tree: sampleData,
	classes: {
		root: styles.treeRoot,
		draggingSource: styles.draggingSource,
		dropTarget: styles.dropTarget,
		listItem: (node) => {
			return node.data?.fileType ? styles[node.data.fileType] : "";
		},
	},
	initialOpen: true,
	render: function render(node, options) {
		return <CustomNode node={node} {...options} />;
	},
	dragPreviewRender: (monitorProps: DragLayerMonitorProps<FileProperties>) => (
		<CustomDragPreview monitorProps={monitorProps} />
	),
};

DynamicClassNameStory.storyName = "Dynamic class name";

DynamicClassNameStory.parameters = {
	csb: {
		jsId: "dynamic-class-name-js-vskw43",
		tsId: "dynamic-class-name-ts-thrng9",
	},
};

if (!interactionsDisabled) {
	DynamicClassNameStory.play = async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByText("File 1-1")).toHaveStyle({
			color: "#1b5e20",
		});
		await expect(canvas.getByText("File 1-2")).toHaveStyle({
			color: "#01579b",
		});
		await expect(canvas.getByText("File 2-1-1")).toHaveStyle({
			color: "#b71c1c",
		});
		await expect(canvas.getByText("File 3")).toHaveStyle({ color: "#b71c1c" });
	};
}
