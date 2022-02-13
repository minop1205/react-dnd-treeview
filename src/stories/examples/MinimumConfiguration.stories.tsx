import React from "react";
import { Meta } from "@storybook/react";
import * as argTypes from "../argTypes";
import { Tree } from "../../Tree";
import { TreeProps } from "../../types";
import { FileProperties } from "../types";

export default {
  component: Tree,
  title: "Examples/Tree/Minimum configuration",
  argTypes,
} as Meta<TreeProps<FileProperties>>;

import { Template } from "../Template";
import sampleData from "../assets/sample-default.json";

export const MinimumConfigurationStory = Template.bind({});

MinimumConfigurationStory.args = {
  rootId: 0,
  tree: sampleData,
  classes: {
    root: "tree-root",
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
