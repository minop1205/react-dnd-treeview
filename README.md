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

```
$ npm install --save @minoru-okuyama/react-dnd-treeview
```

### Usage

```
(minimum code here)

```

## Data Structure

このモジュールを利用するためには、次のようなデータが必要です。


### Basic example

```
(minimum data model)
```

### Optional data

```
(optional data model)
```

### Node Properties

|Key|Type|Required|Description|
|--|--|--|--|
|id|number &#124; string|yes|Identifier of each node|
|parent|number &#124; string|yes|Parent id of each node|
|droppable|boolean|yes|If `true`, child nodes will be accepted and other nodes can be dropped|
|text|string|yes|Node label|
|data|any|no|各ノード注入する追加のデータ<br>これらのデータはレンダープロップスで利用することができます。|


### Component API

|Props|Type|Required|Default|Description|
|--|--|--|--|--|
|tree|array|yes||????|
|rootId|number &#124; string |yes||ルートノードのIDです。ツリービュー内で表示される最も階層の浅いノードの親IDとなります。|
|openIds|array|no|[]|各ノードの開閉状態を表すノードIDの配列です。|
|classes|object|no|CSSクラス名です。レンダープロップスの外側のデザインを整える時にに使用できます。|
|listComponent|string|no|ul|リスト用のHTMLタグです。|
|listItemComponent|string|no|li|リストアイテム用のHTMLタグです。|
|render|function|yes||各ノードのレンダー関数です。|
|dragPreviewRender|function|no|undefined|ドラッグ中ノードのレンダリングをカスタマイズするための関数です。|
|onChange|function|yes||ツリーの状態が変更された時のコールバック関数|
|onClick|array|yes||各ノードがクリックされた時のコールバック関数|

### Component Styling

（classesの説明）

### State Management

ツリービューのデータや開閉状態は、コンポーネントの利用側で管理する必要があります。  
ヘルパ関数を用意しています。


## License
MIT.
