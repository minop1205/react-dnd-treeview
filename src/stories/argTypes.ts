import { ArgType } from "@storybook/api";
import { ControlType } from "@storybook/components";

type CustomArgType = ArgType & {
  type?: {
    required: boolean;
  };
  table: {
    type: { summary: string };
    defaultValue?: { summary: string };
  };
  control?: {
    type: ControlType;
  };
  action?: string;
};

export const rootId: CustomArgType = {
  name: "rootId",
  type: { required: true },
  description: `The id of the root node. It is the parent id of the shallowest node displayed in the tree view.`,
  table: {
    type: { summary: "number | string" },
  },
  control: {
    type: "number",
  },
};

export const onDrop: CustomArgType = {
  name: "onDrop",
  type: { required: true },
  description: `Callback function for when the state of the tree is changed.  
    The new data is passed as the argument.`,
  table: {
    type: { summary: "func" },
  },
  action: "onDrop",
};

export const onChangeOpen: CustomArgType = {
  name: "onChangeOpen",
  description: `Callback function to be called after the open/close state of a node is changed.  
    The function is passed an array of node IDs in the open state.`,
  table: {
    type: { summary: "func" },
    defaultValue: { summary: "undefined" },
  },
  action: "onChangeOpen",
};

export const tree: CustomArgType = {
  name: "tree",
  type: { required: true },
  description: `The data representing the tree structure. An array of node data.`,
  table: {
    type: { summary: "array" },
  },
};

export const classes: CustomArgType = {
  name: "classes",
  description: `A set of CSS class names to be applied to a specific area in the tree view.`,
  table: {
    type: { summary: "object" },
    defaultValue: { summary: "undefined" },
  },
};

export const render: CustomArgType = {
  name: "render",
  description: `The render function of each node.`,
  type: { required: true },
  table: {
    type: { summary: "func" },
  },
};
