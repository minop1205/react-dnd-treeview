import type { Meta } from "@storybook/react";
import React from "react";
// import { within } from "@storybook/test";
import { DndProvider } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { getBackendOptions, MultiBackend, Tree } from "~/index";
import * as argTypes from "~/stories/argTypes";
import sampleData from "~/stories/assets/sample-default.json";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import { CustomNode } from "~/stories/examples/components/CustomNode";
import type { FileProperties } from "~/stories/types";
import type { DragLayerMonitorProps, TreeProps } from "~/types";
// import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import styles from "./FileDrop.module.css";
import { Template } from "./Template";

export default {
	component: Tree,
	title: "Basic Examples/File drop",
	argTypes,
	decorators: [
		(Story) => (
			<DndProvider backend={MultiBackend} options={getBackendOptions()}>
				<Story />
			</DndProvider>
		),
	],
} as Meta<TreeProps<FileProperties>>;

export const FileDrop = Template.bind({});

FileDrop.args = {
	rootId: 0,
	tree: sampleData,
	classes: {
		root: styles.treeRoot,
		draggingSource: styles.draggingSource,
		dropTarget: styles.dropTarget,
	},
	extraAcceptTypes: [NativeTypes.FILE],
	render: function render(node, options) {
		return <CustomNode node={node} {...options} />;
	},
	dragPreviewRender: (monitorProps: DragLayerMonitorProps<FileProperties>) => (
		<CustomDragPreview monitorProps={monitorProps} />
	),
};

FileDrop.storyName = "File drop";

FileDrop.parameters = {
	csb: {
		jsId: "file-drop-js-x1o985",
		tsId: "file-drop-ts-4s5i48",
	},
};

// TODO:
// Testing is on hold for now
// because we cannot simulate drag and drop of external files.
// if (!interactionsDisabled) {
//   FileDrop.play = async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//   };
// }
