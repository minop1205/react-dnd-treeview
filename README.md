# React DnD TreeView

A draggable / droppable React-based treeview component.  
You can use render props to create each node freely.

![react-dnd-treeview](https://user-images.githubusercontent.com/3772820/96185033-45680500-0f74-11eb-8f93-d9f605cf5b2d.gif)

## Demo
- [Full Features](https://google.com/)

## Examples

- [Minimum Settings](https://google.com/)
- [Drag & Drop](https://google.com/)
- [Custom node](https://google.com/)
- [Custom drag preview](https://google.com)
- [Select node](https://google.com)
- [Multi Select node (checkobx)](https://google.com)

## Getting Started

### Installation

```shell
$ npm install --save @minoru-okuyama/react-dnd-treeview
```

### Usage

```jsx
import { Tree } from "@minoru-okuyama/react-dnd-treeview";

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
    "droppable": false,
    "text": "File 1-1"
  },
  {
    "id": 3,
    "parent": 1,
    "droppable": false,
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
    "droppable": false,
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
    "droppable": false,
    "text": "File 1-1",
    "data": {
      "fileType": "csv",
      "fileSize": "0.5MB"
    }
  },
  {
    "id": 3,
    "parent": 1,
    "droppable": false,
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
    "droppable": false,
    "text": "File 2-1-1",
    "data": {
      "fileType": "image",
      "fileSize": "2.1MB"
    }
  }
]
```

### Node Properties

|Key|Type|Required|Description|
|--|--|--|--|
|id|number &#124; string|yes|Identifier of each node|
|parent|number &#124; string|yes|Parent id of each node|
|droppable|boolean|yes|If `true`, child nodes will be accepted and other nodes can be dropped|
|text|string|yes|Node label|
|data|any|no|Additional data to be injected into each node.<br>These data are available in the render props.|


### Component API

|Props|Type|Required|Default|Description|
|--|--|--|--|--|
|tree|array|yes||The data representing the tree structure. An array of node data.|
|rootId|number &#124; string |yes||The id of the root node. It is the parent id of the shallowest node displayed in the tree view.|
|classes|object|no|undefined|A set of CSS class names to be applied to a specific area in the tree view.<br>See the [Component Styling](#Component-Styling) section for more information.|
|listComponent|string|no|ul|The HTML tag for the list.|
|listItemComponent|string|no|li|HTML tag for list items.|
|render|function|yes||The render function of each node.<br>Please refer to the [Render prop](#Render-prop) section for more details about the render functions.|
|dragPreviewRender|function|no|undefined|Render function for customizing the drag preview.<br>See the [Dragging Preview](#Dragging-Preview) section for more information on customizing the drag preview.|
|onDrop|function|yes||Callback function for when the state of the tree is changed.<br>The new data is passed as the argument.|

### Render prop

To render each tree node, please pass a render function to the `render` property.

```jsx
<Tree
  {...props}
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

The arguments passed to the render function are as follows

|Name|Type|Description|
|--|--|--|
|data|object|Node data. (an element in the tree data array)|
|options.depth|number|The depth of the node hierarchy.|
|options.isOpen|boolean|The open and closed state of the node.<br>If droppable = false, isOpen is always false.|
|options.onToggle|function|An event handler for the open/close button of a node.|


### Dragging Preview

By default, the drag preview is a screenshot of a DOM node.  
The `dragPreviewRender` property allows you to display a custom React component instead of a screenshot.
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

|Name|Type|Description|
|--|--|--|
|item|object|Node data. (an element in the tree data array)<br>It also includes the `ref` property, which is a reference to the HTML element to be dragged.|
|clientOffset|object|The client offset of the pointer during the dragging operation.<br>It is in the format of `{x: number, y: number}`.<br>If the item is not being dragged, it is set to `null`.|

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

|Name|Description|
|--|--|
|root|CSS class name to give to the top-level container element (by default, `ul` tag) that wraps all nodes.|
|container|CSS class name to give to the element wrapping the list of nodes of the same hierarchy (by default, `ul` tag).|
|dropTarget|CSS class name to give to the area that can be dropped during a node dragging operation.|
|draggingSource|CSS class name to give to the node during the dragging operation.|

### Usage to openAll, closeAll methods

The open/close state of a node is managed within the Tree component, but methods are available outside the component to open and close all nodes.

```jsx
const ref = useRef(null);

const handleOpenAll = () => ref.current.openAll();
const handleCloseAll = () => ref.current.closeAll();

<Tree
  ref={ref}
  {...props}
>

<button onClick={handleOpenAll}>Open All Folders</button>
<button onClick={handleCloseAll}>Close All Folders</button>
```


## License
MIT.
