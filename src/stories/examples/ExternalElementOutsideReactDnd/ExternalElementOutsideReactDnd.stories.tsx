import React from "react";
// import { expect, fireEvent, within } from "@storybook/test";
import { DndProvider } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { Tree, MultiBackend, getBackendOptions } from "~/index";
import * as argTypes from "~/stories/argTypes";
import sampleData from "~/stories/assets/sample-default.json";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import { CustomNode } from "~/stories/examples/components/CustomNode";
// import { getPointerCoords, wait } from "~/stories/examples/helpers";
// import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import { ExternalContainer } from "./ExternalContainer";
import styles from "./ExternalElementOutsideReactDnd.module.css";
import { StoryProvider } from "./StoryProvider";
import { Template } from "./Template";
import type { Meta } from "@storybook/react";
import type { FileProperties } from "~/stories/types";
import type { TreeProps, DragLayerMonitorProps } from "~/types";

export default {
  component: Tree,
  title: "Basic Examples/External element (outside react-dnd)",
  argTypes,
  decorators: [
    (Story, options) => {
      const args = options.args as TreeProps<FileProperties>;
      return (
        <StoryProvider {...args}>
          <div className={styles.rootGrid}>
            <ExternalContainer />
            <div>
              <DndProvider backend={MultiBackend} options={getBackendOptions()}>
                <Story />
              </DndProvider>
            </div>
          </div>
        </StoryProvider>
      );
    },
  ],
} as Meta<TreeProps<FileProperties>>;

export const ExternalElementOutsideReactDnd = Template.bind({});

ExternalElementOutsideReactDnd.args = {
  rootId: 0,
  tree: sampleData,
  classes: {
    root: styles.treeRoot,
    draggingSource: styles.draggingSource,
    dropTarget: styles.dropTarget,
  },
  extraAcceptTypes: [NativeTypes.TEXT],
  render: function render(node, options) {
    return <CustomNode node={node} {...options} />;
  },
  dragPreviewRender: (monitorProps: DragLayerMonitorProps<FileProperties>) => (
    <CustomDragPreview monitorProps={monitorProps} />
  ),
};

ExternalElementOutsideReactDnd.storyName =
  "External element (outside react-dnd)";

ExternalElementOutsideReactDnd.parameters = {
  csb: {
    jsId: "external-element-outside-react-dnd-js-67bw7o",
    tsId: "external-element-outside-react-dnd-ts-zughk9",
  },
};

// Skip play function due to the following problem
// https://github.com/react-dnd/react-dnd/issues/3119

// if (!interactionsDisabled) {
//   ExternalElementOutsideReactDnd.play = async ({ canvasElement }) => {
//     const canvas = within(canvasElement);

//     // drag over into tree root from element outside react-dnd.
//     // Cannot pass dataTransfer to the drop event,
//     // so testing the drop is not possible.
//     {
//       const dragSource = canvas.getByTestId("external-node-101");
//       const dragSource2 = canvas.getByTestId("custom-node-7");
//       const dropTarget = canvas.getByRole("list");
//       const coords = getPointerCoords(dropTarget, { x: 20, y: 20 });
//       const dataTransfer = new DataTransfer();
//       const options = {
//         dataTransfer,
//         ...coords,
//       };

//       await wait();

//       fireEvent.dragStart(dragSource, options);
//       fireEvent.dragEnter(dropTarget, coords);
//       fireEvent.dragOver(dropTarget, coords);

//       await wait();
//       expect(dropTarget).toHaveStyle("background-color: #e8f0fe");
//     }
//   };
// }
