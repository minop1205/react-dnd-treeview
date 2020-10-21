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

各ツリーノードのレンダリングには `render` プロパティにレンダー関数を渡します。

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

レンダー関数に渡される引数は次の通りです。

|Name|Type|Description|
|--|--|--|
|data|object|ノードデータです。<br>tree プロパティに渡された配列の中の１つの要素が渡されます。|
|options.depth|number|ノードの階層の深さです。|
|options.isOpen|boolean|ノードの開閉状態です。droppable = false の場合、isOpenは常に false です。|
|options.onToggle|function|ノードの開閉ボタンのためのイベントハンドラです。|


### Dragging Preview

既定ではドラッグプレビューにはDOMノードのスクリーンショットが使われます。  
`dragPreviewRender` プロパティを使用することでスクリーンショットの代わりにカスタムReactコンポーネントを表示することができます。

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

`dragPreviewRender` 渡されるデータには次のプロパティが含まれます。

|Name|Type|Description|
|--|--|--|
|item|object|ノードデータです。<br>tree プロパティに渡された配列の中の１つの要素が渡されます。<br>また、ドラッグ対象のHTML要素への参照である `ref` プロパティも含まれています。|
|clientOffset|object|ドラッグ操作中のポインタのクライアントオフセットです。`{x: number, y: number}` の形式で表されます。<br>アイテムがドラッグされていない場合は `null` になります。|

### Component Styling

ツリー内の個々のノードのスタイリングは Render props 内で自由に定義できますが、それ以外の部分には `classes` プロパティにCSSクラス名を指定することでスタイルを注入することができます。

```jsx
<Tree
  {...props}
  classes={{
    root: "my-root-classname",
    dragOver: "my-dragover-classname",
  }}
/>
```

`classes` プロパティに渡すオブジェクトには次のキーを使用することができます。いずれのキーも必須ではありません。

|Name|Description|
|--|--|
|root|全てのノードをラップする最上位のコンテナ要素（デフォルトでは `ul` タグ）に付与する className|
|container|同階層のノードリストをラップする要素（デフォルトでは `ul` タグ）に付与する className|
|dropTarget|ノードのドラッグ操作中にドロップ可能なエリアに付与する className|
|draggingSource|ドラッグ操作中のノードに付与する className|

### Usage to openAll, closeAll methods

ノードの開閉状態は `Tree` コンポーネントの内部で管理されますが、全てのノードを開閉するためのメソッドをコンポーネントの外部から利用することができます。

```jsx
const ref = useRef<OpenIdsHandlers>(null);

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
