import React from "react";
import { Template } from "./Template";
import sampleData from "./assets/sample-default.json";

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
