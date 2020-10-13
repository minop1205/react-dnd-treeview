# React DnD TreeView

A draggable / droppable React-based treeview component.  
You can use render props to create each node freely.

(insert animation GIF here)

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

ツリーを表示するためには、次のようなデータを `Tree` コンポーネントに渡す必要があります。

### Basic example

ツリーを表現するための最小限のデータ構造は次の例の通りです。

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

各ノードのレンダリングにカスタムプロパティを与えたい場合は、`data` プロパティを使うことができます。

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
|data|any|no|各ノード注入する追加のデータ<br>これらのデータはレンダープロップスの中で利用することができます。|


### Component API

|Props|Type|Required|Default|Description|
|--|--|--|--|--|
|tree|array|yes||ツリー構造を表現したデータです。ノードデータの配列です。|
|rootId|number &#124; string |yes||ルートノードのIDです。ツリービュー内で表示される最も階層の浅いノードの親IDとなります。|
|classes|object|no|undefined|CSSクラス名です。レンダープロップスの外側のデザインを整える時にに使用できます。|
|listComponent|string|no|ul|リスト用のHTMLタグです。|
|listItemComponent|string|no|li|リストアイテム用のHTMLタグです。|
|render|function|yes||各ノードのレンダー関数です。|
|dragPreviewRender|function|no|undefined|ドラッグ中ノードのレンダリングをカスタマイズするための関数です。|
|onDrop|function|yes||ツリーの状態が変更された時のコールバック関数です。引数に新しいデータが渡されます。|

### Render params

|Name|Type|Description|
|--|--|--|
|data|object|ノードデータ|
|options|object||

(Usage of Render here)

### Component Styling

（classesの説明）

### Usage to openAll, closeAll methods

(openAll, closeAll の使い方説明)

## License
MIT.
