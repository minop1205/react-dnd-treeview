# React DnD TreeView

A draggable / droppable React-based treeview component.  
You can use render props to create each node freely.

![react-dnd-treeview](https://user-images.githubusercontent.com/3772820/98293395-94441000-1ff1-11eb-81db-b84c31b03c6b.gif)

## Demo

- [JavaScript](https://codesandbox.io/s/full-features-js-itczn) | [TypeScript](https://codesandbox.io/s/full-features-ts-5296j)

## Examples (on CodeSandbox)

Some of the examples below use Material-UI components, but TreeView does not depend on Material-UI, so you can use other libraries or your own custom components.

- Minimum configuration ([JavaScript](https://codesandbox.io/s/minimum-configuration-js-d9kem) | [TypeScript](https://codesandbox.io/s/minimum-configuration-ts-wjigd))
- Custom node ([JavaScript](https://codesandbox.io/s/custom-node-js-lulok) | [TypeScript](https://codesandbox.io/s/custom-node-ts-buimk))
- Custom drag preview ([JavaScript](https://codesandbox.io/s/custom-drag-previewjs-m8rp2) | [TypeScript](https://codesandbox.io/s/custom-drag-preview-ts-bdhgj))
- Select node ([JavaScript](https://codesandbox.io/s/select-node-js-hvlzq) | [TypeScript](https://codesandbox.io/s/select-node-ts-7elv2))
- Multiple selections(checkobx) ([JavaScript](https://codesandbox.io/s/multiple-selections-js-ve17w) | [TypeScript](https://codesandbox.io/s/multiple-selections-ts-eud8c))
- Opening and closing all nodes ([JavaScript](https://codesandbox.io/s/opening-and-closing-all-nodes-js-qn00x) | [TypeScript](https://codesandbox.io/s/opening-and-closing-all-nodes-ts-43j5l))
- Auto expand with drag over node ([JavaScript](https://codesandbox.io/s/auto-expand-with-drag-over-node-js-zksyi) | [TypeScript](https://codesandbox.io/s/opening-and-closing-all-nodes-ts-forked-7rcdk))
- Initialize with open parents ([JavaScript](https://codesandbox.io/s/initialize-with-open-parents-js-hk45o) | [TypeScript](https://codesandbox.io/s/initialize-with-open-parents-ts-9nkw3))
- Editable nodes ([JavaScript](https://codesandbox.io/s/editable-js-m25be) | [TypeScript](https://codesandbox.io/s/editable-ts-cl3wi))
- Manual sort with placeholder ([JavaScript](https://codesandbox.io/s/placeholder-js-xhu2j) | [TypeScript](https://codesandbox.io/s/placeholder-ts-w71l5))

## Getting Started

### Installation

```shell
$ npm install --save @minoru/react-dnd-treeview
```

### Usage

```jsx
import { Tree } from "@minoru/react-dnd-treeview";

...

const [treeData, setTreeData] = useState(initialData);
const handleDrop = (newTreeData) => setTreeData(newTreeData);

<Tree
  tree={treeData}
  rootId={0}
  onDrop={handleDrop}
  render={(node, {depth, isOpen, onToggle}) => (
    <div style={{marginLeft: depth * 10}}>
      {node.droppable && (
        <span onClick={onToggle}>
          {isOpen ? "[-]" : "[+]"}
        </span>
      )}
      {node.text}
    </div>
  )}
/>
```

## Data Structure

In order to display the tree,  
we need to pass the following data to the `Tree` component

### Basic example

The minimal data structure for representing the tree is shown in the following example

```json
[
  {
    "id": 1,
    "parent": 0,
    "droppable": true,
    "text": "Folder 1"
  },
  {
    "id": 2,
    "parent": 1,
    "text": "File 1-1"
  },
  {
    "id": 3,
    "parent": 1,
    "text": "File 1-2"
  },
  {
    "id": 4,
    "parent": 0,
    "droppable": true,
    "text": "Folder 2"
  },
  {
    "id": 5,
    "parent": 4,
    "droppable": true,
    "text": "Folder 2-1"
  },
  {
    "id": 6,
    "parent": 5,
    "text": "File 2-1-1"
  }
]
```

### Optional data

If you want to pass custom properties to each node's rendering,  
you can use the `data` property.

```json
[
  {
    "id": 1,
    "parent": 0,
    "droppable": true,
    "text": "Folder 1"
  },
  {
    "id": 2,
    "parent": 1,
    "text": "File 1-1",
    "data": {
      "fileType": "csv",
      "fileSize": "0.5MB"
    }
  },
  {
    "id": 3,
    "parent": 1,
    "text": "File 1-2",
    "data": {
      "fileType": "pdf",
      "fileSize": "4.8MB"
    }
  },
  {
    "id": 4,
    "parent": 0,
    "droppable": true,
    "text": "Folder 2"
  },
  {
    "id": 5,
    "parent": 4,
    "droppable": true,
    "text": "Folder 2-1"
  },
  {
    "id": 6,
    "parent": 5,
    "text": "File 2-1-1",
    "data": {
      "fileType": "image",
      "fileSize": "2.1MB"
    }
  }
]
```

### Node Properties

| Key       | Type             | Required | Default   | Description                                                                                     |
| --------- | ---------------- | -------- | --------- | ----------------------------------------------------------------------------------------------- |
| id        | number \| string | yes      | -         | Identifier of each node                                                                         |
| parent    | number \| string | yes      | -         | Parent id of each node                                                                          |
| text      | string           | yes      | -         | Node label                                                                                      |
| droppable | boolean          | no       | false     | If `true`, child nodes will be accepted and it will be able to drop other node                  |
| data      | any              | no       | undefined | Additional data to be injected into each node.<br>These data are available in the render props. |

## Component API

| Props                | Type                | Required | Default   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------------- | ------------------- | -------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tree                 | array               | yes      |           | The data representing the tree structure. An array of node data.                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| rootId               | number \| string    | yes      |           | The id of the root node. It is the parent id of the shallowest node displayed in the tree view.                                                                                                                                                                                                                                                                                                                                                                                                            |
| classes              | object              | no       | undefined | A set of CSS class names to be applied to a specific area in the tree view.<br>See the [Component Styling](#Component-Styling) section for more information.                                                                                                                                                                                                                                                                                                                                               |
| listComponent        | string              | no       | ul        | HTML tag for list.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| listItemComponent    | string              | no       | li        | HTML tag for list items.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| render               | function            | yes      |           | The render function of each node.<br>Please refer to the [Render prop](#Render-prop) section for more details about the render functions.                                                                                                                                                                                                                                                                                                                                                                  |
| dragPreviewRender    | function            | no       | undefined | Render function for customizing the drag preview.<br>See the [Dragging Preview](#Dragging-Preview) section for more information on customizing the drag preview<br><br>**NOTE**:<br>The default preview is not displayed on touch devices. Therefore, if you want to support touch devices, please define a custom preview in `dragPreviewRender`.                                                                                                                                                         |
| onDrop               | function            | yes      |           | Callback function for when the state of the tree is changed.<br>The new data is passed as the argument.<br>See the [onDrop callback](#onDrop-callback) section for more information.                                                                                                                                                                                                                                                                                                                       |
| canDrop              | function            | no       | undefined | A callback function to determine if a given node can be dropped to another node.<br>If nothing is returned (or if undefined is returned), the default rules are followed.<br>If it returns true or false, the default rules will be overridden and the `dropable` properties of each node will not be referenced.<br>This callback takes the current tree and the same option object that is passed to the onDrop callback.<br>See the [canDrop callback](#canDrop-callback) section for more information. |
| canDrag              | function            | no       | undefined | Callback function which should return true or false depending on if a give node should be draggable.<br>By default, all nodes are draggable.                                                                                                                                                                                                                                                                                                                                                               |
| sort                 | function \| boolean | no       | true      | This property controls the order of the child nodes.<br> By default (`true`), they are sorted by the `text` property of each node.<br> If `false`, sorting is disabled. In this case, the nodes will follow the order of the array passed to the `tree` property.<br>It is also possible to customize the sorting by passing a callback function.                                                                                                                                                          |
| insertDroppableFirst | boolean             | no       | true      | Specifies whether droppable nodes should be placed first in the list of child nodes.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| placeholderRender    | function            | no       | undefined | Render function for the drop destination placeholder. By default, placeholder is not displayed.<br>See the [Manual sort with placeholder](#Manual-sort-with-placeholder) section for more information on using placeholder.                                                                                                                                                                                                                                                                                |
| placeholderComponent | string              | no       | li        | HTML tag for placeholder.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| dropTargetOffset     | number              | no       | 0         | Effective drop range of a dropable node. It is specified in pixels from the top or bottom of the node.<br>Used to insert a node anywhere using placeholders.<br><br>See the [Manual sort with placeholder placeholder](#Manual-sort-with-placeholder) section for more information on using placeholder.                                                                                                                                                                                                   |
| initialOpen          | boolean \| array    | no       | false     | If true, all parent nodes will be initialized to the open state.<br>If an array of node IDs is passed instead of the boolean value, only the specified node will be initialized in the open state.                                                                                                                                                                                                                                                                                                         |

### Render prop

To render each tree node, please pass a render function to the `render` property.

```jsx
<Tree
  {...props}
  render={(node, { depth, isOpen, draggable, onToggle }) => (
    <div style={{ marginLeft: depth * 10 }}>
      {node.droppable && (
        <span onClick={onToggle}>{isOpen ? "[-]" : "[+]"}</span>
      )}
      {node.text}
    </div>
  )}
/>
```

The arguments passed to the render function are as follows

| Name              | Type     | Description                                                                                                 |
| ----------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| data              | object   | Node data. (an element in the tree data array)                                                              |
| options.depth     | number   | The depth of the node hierarchy.                                                                            |
| options.isOpen    | boolean  | The open and closed state of the node.<br>If `droppable` is not `true`, isOpen is always false.             |
| options.draggable | boolean  | Indicates whether this node is draggable or not.                                                            |
| options.hasChild  | boolean  | Flag indicating whether or not the node has children. It is true if the node has children, false otherwise. |
| options.onToggle  | function | An event handler for the open/close button of a node.                                                       |

### Dragging Preview

By default, the drag preview is a screenshot of a DOM node.  
The `dragPreviewRender` property allows you to display a custom React component instead of a screenshot.

NOTE:  
The default preview is not displayed on touch devices.  
Therefore, if you want to support touch devices, please define a custom preview in `dragPreviewRender`.

```jsx
<Tree
  {...props}
  dragPreviewRender={(monitorProps) => {
    const item = monitorProps.item;

    return (
      <div>
        <p>{item.text}</p>
      </div>
    );
  }}
/>
```

The data passed to `dragPreviewRender` contains the following properties

| Name         | Type   | Description                                                                                                                                                                   |
| ------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| item         | object | Node data. (an element in the tree data array)<br>It also includes the `ref` property, which is a reference to the HTML element to be dragged.                                |
| clientOffset | object | The client offset of the pointer during the dragging operation.<br>It is in the format of `{x: number, y: number}`.<br>If the item is not being dragged, it is set to `null`. |

### onDrop callback

If the tree is modified by drag-and-drop, the changes can be retrieved by the `onDrop` callback.

```jsx
const [treeData, setTreeData] = useState(initialTreeData);
const handleDrop = (
  newTree,
  { dragSourceId, dropTargetId, dragSource, dropTarget }
) => {
  // Do something

  setTreeData(newTree);
};

return <Tree {...props} tree={treeData} onDrop={handleDrop} />;
```

The arguments passed to the onDrop callback function are as follows

| Name                 | Type                | Description                                                                                                                      |
| -------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| newTree              | array               | This data represents the updated TreeView.<br>To redraw the modified TreeView, you need to set this data to the `tree` property. |
| options.dragSourceId | number \| string    | node id of the dragging source                                                                                                   |
| options.dropTargetId | number \| string    | node id of the drop destination.<br>If the drop destination is the root node, it will be the value of the `rootId` property.     |
| options.dragSource   | object              | node item of the dragging source                                                                                                 |
| options.dropTarget   | object \| undefined | node item of the drop destination.<br>If the drop destination is the root node, it will be `undefined`                           |

### canDrop callback

By default, it allows dropping to any dropable node (or root node) except its own descendants.
This callback can override the default rules.

If it returns nothing or returns `undefined`, the default rules will be applied. If it returns a boolean value, it will override the default rules and the droppable property of each node will no longer be referenced.

If it returns false and the user drops the dragged node, no action will be taken and the onDrop callback will not be fired.

This callback takes the same parameters as the [onDrop callback](#onDrop-callback), but the first parameter specifies the current tree.

```jsx
const canDrop = (
  currentTree,
  { dragSourceId, dropTargetId, dragSource, dropTarget }
) => {
  return true;

  // or

  return false;

  // or

  return;

  // or

  return undefined;
};

return <Tree {...props} tree={treeData} canDrop={canDrop} />;
```

NOTE:  
When overriding the default rules by returning true or false, be careful of inconsistencies in the tree structure.  
For example, if you allow dropping from a parent node to a child node as shown in the figure below, inconsistency will occur and the tree will collapse.

![malformed tree](https://user-images.githubusercontent.com/3772820/114326837-9d717400-9b71-11eb-91cf-c762c4ab7461.gif)

### Manual sort with placeholder

By default, nodes are automatically sorted and cannot be sorted manually, but by combining some APIs, you can sort them manually and display placeholders as follows.

![placeholder_sample](https://user-images.githubusercontent.com/3772820/129397312-9501e164-d413-4a06-b023-1713d206004e.gif)

The following is an example (excerpt) of the implementation of manual sort of nodes and placeholder display.

```jsx
import { CustomPlaceholder } from "./CustomPlaceholder";
import styles from "./App.module.css";

function App() {
  const [treeData, setTreeData] = useState(SampleData);
  const handleDrop = (newTree) => setTreeData(newTree);

  <Tree
    {...props}
    tree={treData}
    onDrop={handleDrop}
    classes={{
      placeholder: styles.placeholder,
    }}
    sort={false}
    insertDroppableFirst={false}
    canDrop={(tree, { dragSource, dropTargetId }) => {
      if (dragSource?.parent === dropTargetId) {
        return true;
      }
    }}
    dropTargetOffset={5}
    placeholderRender={(node, { depth }) => (
      <CustomPlaceholder node={node} depth={depth} />
    )}
  />;
}
```

### Component Styling

You are free to define the styling of individual nodes in the tree in your Render props, but the rest of the tree can be styled by specifying the CSS class name for the `classes` property.

```jsx
<Tree
  {...props}
  classes={{
    root: "my-root-classname",
    dragOver: "my-dragover-classname",
  }}
/>
```

You can use the following keys for the objects you pass to the `classes` property. Neither key is required.

| Name           | Description                                                                                                    |
| -------------- | -------------------------------------------------------------------------------------------------------------- |
| root           | CSS class name to give to the top-level container element (by default, `ul` tag) that wraps all nodes.         |
| container      | CSS class name to give to the element wrapping the list of nodes of the same hierarchy (by default, `ul` tag). |
| dropTarget     | CSS class name to give to the area that can be dropped during a node dragging operation.                       |
| draggingSource | CSS class name to give to the node during the dragging operation.                                              |
| placeholder    | CSS class name to give to the element wrapping the placeholder (by default, `li` tag).                         |

### Usage to open / close methods

The open/close status of a node is managed within the Tree component, but the methods for opening and closing nodes are public, so they can be controlled from outside the Tree component.

```jsx
const ref = useRef(null);

const handleOpenAll = () => ref.current.openAll();
const handleCloseAll = () => ref.current.closeAll();

// open /close method can be passed a node ID or an array of node IDs
const handleOpen = (nodeId) => ref.current.open(nodeId);
const handleClose = (nodeId) => ref.current.close(nodeId);

<Tree
  ref={ref}
  {...props}
>

<button onClick={handleOpenAll}>Open All Folders</button>
<button onClick={handleCloseAll}>Close All Folders</button>
<button onClick={handleOpen}>Open specific folder(s)</button>
<button onClick={handleClose}>Close specific folder(s)</button>

```

## License

MIT.
