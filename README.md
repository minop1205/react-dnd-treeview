# React DnD TreeView

A draggable and droppable React treeview component.  
You can use render props to create each node freely.

![react-dnd-treeview](https://user-images.githubusercontent.com/3772820/204380436-4c501e28-6c0a-43ea-a317-6620d6dc1ca0.gif)

## Demo and Examples

Some of the examples below use [MUI(Material-UI)](https://mui.com) components, but TreeView does not depend on MUI, so you can use other libraries or your own custom components.

[https://minop1205.github.io/react-dnd-treeview/](https://minop1205.github.io/react-dnd-treeview/?path=/docs/basic-examples-minimum-configuration--minimum-configuration-story)

## Breaking changes and migration

See [Migration Guide](MIGRATION.md) for information on breaking changes and migrations between major versions.

## Getting Started

### Installation

```shell
$ npm i react-dnd @minoru/react-dnd-treeview
```

### Usage

```jsx
import { useState } from "react";
import {
  Tree,
  getBackendOptions,
  MultiBackend,
} from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";
import initialData from "./sample-default.json";

function App() {
  const [treeData, setTreeData] = useState(initialData);
  const handleDrop = (newTreeData) => setTreeData(newTreeData);

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        tree={treeData}
        rootId={0}
        onDrop={handleDrop}
        render={(node, { depth, isOpen, onToggle }) => (
          <div style={{ marginLeft: depth * 10 }}>
            {node.droppable && (
              <span onClick={onToggle}>{isOpen ? "[-]" : "[+]"}</span>
            )}
            {node.text}
          </div>
        )}
      />
    </DndProvider>
  );
}
```

### Backends

`MultiBackend` is a backend to support both touch and pointer devices. If you only need support for one or the other, you can also use the backend provided by [react-dnd-html5-backend](https://react-dnd.github.io/react-dnd/docs/backends/html5) or [react-dnd-touch-backend](https://react-dnd.github.io/react-dnd/docs/backends/touch).

```jsx
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Tree {...someProps}> />
    </DndProvider>
  );
}
```

```jsx
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";

function App() {
  return (
    <DndProvider backend={TouchBackend}>
      <Tree {...someProps}> />
    </DndProvider>
  );
}
```

### Backend options

`HTML5Backend`, `TouchBackend` and `MultiBackend` allow setting the BackendOptions defined in `react-dnd`.

For more information on `TouchBackend`, please see [here](https://react-dnd.github.io/react-dnd/docs/backends/touch#options). (For the HTML5Backend option, only the `rootElement` option is available.)

```jsx
import { DndProvider } from "react-dnd";
import { HTML5Backend, HTML5BackendOptions } from "react-dnd-html5-backend";
import {TouchBackend, TouchBackendOptions} from "react-dnd-touch-backend"
import {Tree, MultiBackend, getBackendOptions} from "@minoru/react-dnd-treeview"

const touchOptions: Partial<TouchBackendOptions> = {
  // some options
};

const html5Options: Partial<HTML5BackendOptions> = {
  rootElement: document.body,
  // some options
};

const multiOptions = {
  touch: touchOptions,
  html5: html5Options,
}

function App() {
  return (
    <DndProvider
      backend={MultiBackend}
      options={getBackendOptions(multiOptions)}

      // or
      // backend={HTML5Backend}
      // options={html5Options}

      // or
      // backend={TouchBackend}
      // options={touchOptions}
    >
      <Tree {...someProps}> />
    </DndProvider>
  );
}
```

## Data Structure

To display the treeview, pass data with the following structure to the `tree` property of the Tree component.

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

### Node properties

| Key       | Type                 | Required | Default     | Description                                                                                     |
| --------- | -------------------- | -------- | ----------- | ----------------------------------------------------------------------------------------------- |
| id        | `number` \| `string` | ✅       | -           | Identifier of each node                                                                         |
| parent    | `number` \| `string` | ✅       | -           | Parent id of each node                                                                          |
| text      | `string`             | ✅       | -           | Node label                                                                                      |
| droppable | `boolean`            |          | `false`     | If `true`, child nodes will be accepted and it will be able to drop other node                  |
| data      | `any`                |          | `undefined` | Additional data to be injected into each node.<br>These data are available in the render props. |

## Component API

| Props                | Type                    | Required | Default     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------------- | ----------------------- | -------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tree                 | `array`                 | ✅       |             | The data representing the tree structure. An array of node data.                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| rootId               | `number` \| `string`    | ✅       |             | The id of the root node. It is the parent id of the shallowest node displayed in the tree view.                                                                                                                                                                                                                                                                                                                                                                                                            |
| extraAcceptTypes     | `array`                 |          | `[]`        | If allowing drop from outside the tree, the [drag type](https://react-dnd.github.io/react-dnd/docs/api/use-drag#specification-object-members) of the drag source.                                                                                                                                                                                                                                                                                                                                          |
| classes              | `object`                |          | `undefined` | A set of CSS class names to be applied to a specific area in the tree view.<br>See the [Component Styling](#Component-Styling) section for more information.                                                                                                                                                                                                                                                                                                                                               |
| listComponent        | `string`                |          | `ul`        | HTML tag for list.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| listItemComponent    | `string`                |          | `li`        | HTML tag for list items.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| render               | `function`              | ✅       |             | The render function of each node.<br>Please refer to the [Render prop](#Render-prop) section for more details about the render functions.                                                                                                                                                                                                                                                                                                                                                                  |
| dragPreviewRender    | `function`              |          | `undefined` | Render function for customizing the drag preview.<br>See the [Dragging Preview](#Dragging-Preview) section for more information on customizing the drag preview<br><br>**NOTE**:<br>The default preview is not displayed on touch devices. Therefore, if you want to support touch devices, please define a custom preview in `dragPreviewRender`.                                                                                                                                                         |
| onDrop               | `function`              | ✅       |             | Callback function for when the state of the tree is changed.<br>The new data is passed as the argument.<br>See the [onDrop callback](#onDrop-callback) section for more information.                                                                                                                                                                                                                                                                                                                       |
| onDragStart          | `function`              |          | `undefined` | This event is fired when a node in the tree is started to be dragged. The event handler is passed the target node and a [DragSourceMonitor](https://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor) object.                                                                                                                                                                                                                                                                                    |
| onDragEnd            | `function`              |          | `undefined` | This event is fired when a node in the tree is finished being dragged. The event handler is passed the target node and a [DragSourceMonitor](https://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor) object.                                                                                                                                                                                                                                                                                   |
| onChangeOpen         | `function`              |          | `undefined` | Callback function to be called after the open/close state of a node is changed.<br>The function is passed an array of node IDs in the open state.                                                                                                                                                                                                                                                                                                                                                          |
| canDrop              | `function`              |          | `undefined` | A callback function to determine if a given node can be dropped to another node.<br>If nothing is returned (or if undefined is returned), the default rules are followed.<br>If it returns true or false, the default rules will be overridden and the `dropable` properties of each node will not be referenced.<br>This callback takes the current tree and the same option object that is passed to the onDrop callback.<br>See the [canDrop callback](#canDrop-callback) section for more information. |
| canDrag              | `function`              |          | `undefined` | Callback function which should return true or false depending on if a give node should be draggable.<br>By default, all nodes are draggable.                                                                                                                                                                                                                                                                                                                                                               |
| sort                 | `function` \| `boolean` |          | `true`      | This property controls the order of the child nodes.<br> By default (`true`), they are sorted by the `text` property of each node.<br> If `false`, sorting is disabled. In this case, the nodes will follow the order of the array passed to the `tree` property.<br>It is also possible to customize the sorting by passing a callback function.                                                                                                                                                          |
| insertDroppableFirst | `boolean`               |          | `true`      | Specifies whether droppable nodes should be placed first in the list of child nodes.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| enableAnimateExpand  | `boolean`               |          | `false`     | Specifies whether use animation when toggle expanding the node.                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| placeholderRender    | `function`              |          | `undefined` | Render function for the drop destination placeholder. By default, placeholder is not displayed.<br>See the [Manual sort with placeholder](#Manual-sort-with-placeholder) section for more information on using placeholder.                                                                                                                                                                                                                                                                                |
| placeholderComponent | `string`                |          | `li`        | HTML tag for placeholder.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| dropTargetOffset     | `number`                |          | `0`         | Effective drop range of a dropable node. It is specified in pixels from the top or bottom of the node.<br>Used to insert a node anywhere using placeholders.<br><br>See the [Manual sort with placeholder placeholder](#Manual-sort-with-placeholder) section for more information on using placeholder.                                                                                                                                                                                                   |
| initialOpen          | `boolean` \| `array`    |          | `false`     | If true, all parent nodes will be initialized to the open state.<br>If an array of node IDs is passed instead of the boolean value, only the specified node will be initialized in the open state. When this prop is updated the open state of the tree is also reset.                                                                                                                                                                                                                                     |
| rootProps            | `object`                |          | `undefined` | Properties to be passed to the root element (by default, `ul` tag), excluding the `ref` and `role` property.                                                                                                                                                                                                                                                                                                                                                                                               |

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

| Name                 | Type              | Description                                                                                                                                                                                                                                                                 |
| -------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data                 | `object`          | Node data. (an element in the tree data array)                                                                                                                                                                                                                              |
| options.depth        | `number`          | The depth of the node hierarchy.                                                                                                                                                                                                                                            |
| options.isOpen       | `boolean`         | The open and closed state of the node.<br>If `droppable` is not `true`, isOpen is always false.                                                                                                                                                                             |
| options.draggable    | `boolean`         | Indicates whether this node is draggable or not.                                                                                                                                                                                                                            |
| options.hasChild     | `boolean`         | Flag indicating whether or not the node has children. It is true if the node has children, false otherwise.                                                                                                                                                                 |
| options.isDragging   | `boolean`         | Flag indicating whether this node is being dragged or not.                                                                                                                                                                                                                  |
| options.isDropTarget | `boolean`         | Flag indicating whether or not this node is a drop target.                                                                                                                                                                                                                  |
| options.containerRef | `React.RefObject` | Reference to the HTML element (default: `li` tag) that wraps the custom node.                                                                                                                                                                                               |
| options.handleRef    | `React.RefObject` | Reference to the HTML element you wish to set as a drag handle. It is used by assigning it to the `ref` attribute of the element you want to set as a handle.By default, no handle is set and the entire node is draggable.<br>See [Drag handle](#Drag-handle) for details. |
| options.onToggle     | `function`        | An event handler for the open/close button of a node.                                                                                                                                                                                                                       |

### Drag handle

By default, the entire node is draggable, but the `handleRef` render option allows the node to be dragged only by the specified handle, as in the following example.

```jsx
<Tree
  {...props}
  render={(node, { handleRef }) => (
    <div>
      <span ref={handleRef}>[Drag me]</span>
      {node.text}
    </div>
  )}
/>
```

### Dragging preview

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

| Name         | Type     | Description                                                                                                                                                                   |
| ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| item         | `object` | Node data. (an element in the tree data array)<br>It also includes the `ref` property, which is a reference to the HTML element to be dragged.                                |
| clientOffset | `object` | The client offset of the pointer during the dragging operation.<br>It is in the format of `{x: number, y: number}`.<br>If the item is not being dragged, it is set to `null`. |

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

| Name                     | Type                                | Description                                                                                                                                                                                                                                                                                      |
| ------------------------ | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| newTree                  | `array`                             | This data represents the updated TreeView.<br>To redraw the modified TreeView, you need to set this data to the `tree` property.                                                                                                                                                                 |
| options.dragSourceId     | `number` \| `string` \| `undefined` | node id of the dragging source.<br>If the drag source is an element external to `DndProvider` or a file or selected text, these will be `undefined`.                                                                                                                                             |
| options.dropTargetId     | `number` \| `string`                | node id of the drop destination.<br>If the drop destination is the root node, it will be the value of the `rootId` property.                                                                                                                                                                     |
| options.dragSource       | `object`                            | node item of the dragging source.<br>If the drag source is an element external to `DndProvider` or a file or selected text, these will be `undefined`.                                                                                                                                           |
| options.dropTarget       | `object` \| `undefined`             | node item of the drop destination.<br>If the drop destination is the root node, it will be `undefined`                                                                                                                                                                                           |
| options.destinationIndex | `number` \| `undefined`             | When the `sort` property is `false`, it indicates the index to which the drag source in the tree data array should be moved.<br>When the `sort` property is `true`, it will be `undefined`.                                                                                                      |
| options.relativeIndex    | `number` \| `undefined`             | When the `sort` property is `false`, it indicates the relative index of the drop destination with respect to the parent node.<br>When the `sort` property is `true`, it will be `undefined`.                                                                                                     |
| options.monitor          | `object`                            | Provides various methods for accessing react-dnd's internal state, e.g. for accessing drag sources from outside DndProvider.<br>See this [definition](https://github.com/react-dnd/react-dnd/blob/f835e26d81094b4aebc9d5b5f7b172beaeddf4b0/packages/dnd-core/src/interfaces.ts#L26) for details. |

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

  return (
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
  );
}
```

### External drag source

To drop elements outside the tree into the tree, `extraAcceptTypes` must be set.

If the external drag source is under a `DndProvider`, set the `type` and `item` using [useDrag](https://react-dnd.github.io/react-dnd/docs/api/use-drag) in react-dnd for that element. add the external drag source `type` to `extraAcceptTypes` so it can be dropped in the tree.

If the external drag source is an element or file external to `DndProvider`, adding the `type` defined in react-dnd-html5-backend to `extraAcceptTypes` will allow dropping into the tree.

In this case, the `onDrop` callback will access the dropped element via `options.monitor` and add the new node to the data array of tree, as in the following example.

```jsx
import { NativeTypes } from "react-dnd-html5-backend";

function App() {
  const [treeData, setTreeData] = useState(SampleData);
  const [lastId, setLastId] = useState(100);

  const handleDrop = (tree, options) => {
    const { dropTargetId, monitor } = options;
    const itemType = monitor.getItemType();

    if (itemType === NativeTypes.FILE) {
      const files = monitor.getItem().files;
      const nodes = files.map((file, index) => ({
        id: lastId + index,
        parent: dropTargetId,
        text: file.name,
      }));

      const mergedTree = [...tree, ...nodes];
      setTree(mergedTree);
      setLastId(lastId + files.length);
    } else {
      setTree(tree);
    }
  };

  return (
    <Tree
      {...someProps}
      tree={treeData}
      extraAcceptTypes={[NativeTypes.FILE]}

      {/*
        extraAcceptTypes={[NativeTypes.URL]}
        extraAcceptTypes={[NativeTypes.TEXT]}
        extraAcceptTypes={[NativeTypes.HTML]}
      */}

      onDrop={handleDrop}
    />;
  );
}
```

### Component styling

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
| listItem       | CSS class name to give to the element that wraps each node item (by default, `li` tag).                        |
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
