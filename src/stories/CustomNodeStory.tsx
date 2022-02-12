import React from "react";
import { Template } from "./Template";
import { CustomNode } from "./CustomNode";
import sampleData from "./assets/sample-default.json";

export const CustomNodeStory = Template.bind({});

CustomNodeStory.args = {
  rootId: 0,
  tree: sampleData,
  classes: {
    root: "tree-root",
    draggingSource: "dragging-source",
    dropTarget: "drop-target",
  },
  render: function render(node, options) {
    return <CustomNode node={node} {...options} />;
  },
};

CustomNodeStory.storyName = "Custom node";
