import React from "react";
import { Meta } from "@storybook/react";
import * as argTypes from "~/stories/argTypes";
import { pageFactory } from "~/stories/pageFactory";
import { Tree } from "~/Tree";
import { TreeProps } from "~/types";
import { FileProperties } from "~/stories/types";
import { DefaultTemplate } from "~/stories/examples/templates/DefaultTemplate";
import sampleData from "~/stories/assets/sample-default.json";
import styles from "./MinimumConfiguration.module.css";

export default {
  component: Tree,
  title: "Examples/Tree/Minimum configuration",
  argTypes,
} as Meta<TreeProps<FileProperties>>;

export const MinimumConfigurationStory = DefaultTemplate.bind({});

MinimumConfigurationStory.args = {
  rootId: 0,
  tree: sampleData,
  classes: {
    root: styles.treeRoot,
  },
  render: function render(node, { depth, isOpen, onToggle }) {
    return (
      <div style={{ marginInlineStart: depth * 10 }}>
        {node.droppable && (
          <span onClick={onToggle}>{isOpen ? "[-]" : "[+]"}</span>
        )}
        {node.text}
      </div>
    );
  },
};

MinimumConfigurationStory.storyName = "Minimum configuration";

MinimumConfigurationStory.parameters = {
  docs: {
    page: pageFactory({
      jsId: "minimum-configuration-js-mrhwrd",
      tsId: "minimum-configuration-ts-tn9xj7",
    }),
  },
};
