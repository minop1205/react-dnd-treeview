import { ArgTypes } from "@storybook/types";

type ArgType = ArgTypes[string];

export const tree: ArgType = {
  name: "tree",
  description:
    "The data representing the tree structure. An array of node data.",
  table: {
    type: { summary: "array" },
  },
  control: {
    type: "object",
  },
};

export const rootId: ArgType = {
  name: "rootId",
  description:
    "The id of the root node. It is the parent id of the shallowest node displayed in the tree view.",
  table: {
    type: { summary: "number | string" },
  },
  control: {
    type: "number",
  },
};

export const extraAcceptTypes: ArgType = {
  name: "extraAcceptTypes",
  description:
    "If allowing drop from outside the tree, the [drag type](https://react-dnd.github.io/react-dnd/docs/api/use-drag#specification-object-members) of the drag source.",
  table: {
    type: { summary: "array" },
    defaultValue: { summary: "undefined" },
  },
  control: {
    type: "object",
  },
};

export const classes: ArgType = {
  name: "classes",
  description:
    "A set of CSS class names to be applied to a specific area in the tree view.",
  table: {
    type: { summary: "object" },
    defaultValue: { summary: "undefined" },
  },
};

export const listComponent: ArgType = {
  name: "listComponent",
  description: "HTML tag for list.",
  table: {
    type: { summary: "string" },
    defaultValue: { summary: "ul" },
  },
};

export const listItemComponent: ArgType = {
  name: "listItemComponent",
  description: "HTML tag for list items.",
  table: {
    type: { summary: "string" },
    defaultValue: { summary: "li" },
  },
};

export const render: ArgType = {
  name: "render",
  description: "The render function of each node.",
  table: {
    type: { summary: "func" },
  },
};

export const dragPreviewRender: ArgType = {
  name: "dragPreviewRender",
  description: "Render function for customizing the drag preview.",
  table: {
    type: { summary: "func" },
    defaultValue: { summary: "undefined" },
  },
};

export const onDrop: ArgType = {
  name: "onDrop",
  description:
    "Callback function for when the state of the tree is changed. The new data is passed as the argument.",
  table: {
    type: { summary: "func" },
  },
  action: "onDrop",
};

export const onDragStart: ArgType = {
  name: "onDragStart",
  description:
    "This event is fired when a node in the tree is started to be dragged. The event handler is passed the target node and a [DragSourceMonitor](https://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor) object.",
  table: {
    type: { summary: "func" },
    defaultValue: { summary: "undefined" },
  },
  action: "onDragStart",
};

export const onDragEnd: ArgType = {
  name: "onDragEnd",
  description:
    "This event is fired when a node in the tree is finished being dragged. The event handler is passed the target node and a [DragSourceMonitor](https://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor) object.",
  table: {
    type: { summary: "func" },
    defaultValue: { summary: "undefined" },
  },
  action: "onDragEnd",
};

export const onChangeOpen: ArgType = {
  name: "onChangeOpen",
  description:
    "Callback function to be called after the open/close state of a node is changed.<br>The function is passed an array of node IDs in the open state.",
  table: {
    type: { summary: "func" },
    defaultValue: { summary: "undefined" },
  },
  action: "onChangeOpen",
};

export const canDrop: ArgType = {
  name: "canDrop",
  description:
    "callback function to determine if a given node can be dropped to another node.<br>If nothing is returned (or if `undefined` is returned), the default rules are followed.<br>If it returns `true` or `false`, the default rules will be overridden and the `droppable` properties of each node will not be referenced.<br>This callback takes the current tree and the same option object that is passed to the onDrop callback.",
  table: {
    type: { summary: "func" },
    defaultValue: { summary: "undefined" },
  },
};

export const canDrag: ArgType = {
  name: "canDrag",
  description:
    "Callback function which should return true or false depending on if a give node should be draggable.<br>By default, all nodes are draggable.",
  table: {
    type: { summary: "func" },
    defaultValue: { summary: "undefined" },
  },
};

export const sort: ArgType = {
  name: "sort",
  description:
    "This property controls the order of the child nodes.<br>By default (`true`), they are sorted by the `text` property of each node.<br>If `false`, sorting is disabled. In this case, the nodes will follow the order of the array passed to the `tree` property.<br>It is also possible to customize the sorting by passing a callback function.",
  table: {
    type: { summary: "func | boolean" },
    defaultValue: { summary: "true" },
  },
};

export const insertDroppableFirst: ArgType = {
  name: "insertDroppableFirst",
  description:
    "Specifies whether droppable nodes should be placed first in the list of child nodes.",
  table: {
    type: { summary: "boolean" },
    defaultValue: { summary: "true" },
  },
};

export const enableAnimateExpand: ArgType = {
  name: "enableAnimateExpand",
  description:
    "Specifies whether use animation when toggle expanding the node.",
  table: {
    type: { summary: "boolean" },
    defaultValue: { summary: "false" },
  },
};

export const placeholderRender: ArgType = {
  name: "placeholderRender",
  description:
    "Render function for the drop destination placeholder. By default, placeholder is not displayed.",
  table: {
    type: { summary: "func" },
    defaultValue: { summary: "undefined" },
  },
};

export const placeholderComponent: ArgType = {
  name: "placeholderComponent",
  description: "HTML tag for placeholder.",
  table: {
    type: { summary: "string" },
    defaultValue: { summary: "li" },
  },
};

export const dropTargetOffset: ArgType = {
  name: "dropTargetOffset",
  description:
    "Effective drop range of a droppable node. It is specified in pixels from the top or bottom of the node.<br>Used to insert a node anywhere using placeholders.",
  table: {
    type: { summary: "number" },
    defaultValue: { summary: "0" },
  },
};

export const initialOpen: ArgType = {
  name: "initialOpen",
  description:
    "If true, all parent nodes will be initialized to the open state.<br>If an array of node IDs is passed instead of the boolean value, only the specified node will be initialized in the open state.",
  table: {
    type: { summary: "boolean | array" },
    defaultValue: { summary: "false" },
  },
};

export const rootProps: ArgType = {
  name: "rootProps",
  description:
    "Properties to be passed to the root element (by default, `ul` tag), excluding the `ref` and `role` property.",
  table: {
    type: { summary: "object" },
    defaultValue: { summary: "undefined" },
  },
};
