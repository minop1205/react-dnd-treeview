# Migration Guide

## v3.x

Among the `options` passed to the `onDrop` callback, `dragSourceId` and `dragSource` are now optional.<br>If the drag source is an element external to `DndProvider` or a file or selected text, these will be `undefined`.

Therefore, if you are using `options.dragSource` or `options.dragSourceId` in your `onDrop` callback, you may need to check whether these values are `undefined` or not.

### Before (v2.x)

```jsx
<Tree
  {...someProps}
  onDrop={(tree, options) => {
    console.log(options.dragSource.id);
  }}
/>
```

### After (v3.x)

```jsx
<Tree
  {...someProps}
  onDrop={(tree, options) => {
    if (options.dragSource) {
      console.log(options.dragSource.id);
    }

    // or

    console.log(options.dragSource?.id);
  }}
/>
```

## v2.x

`react-dnd` is no longer included in this package, so users of this package must separately install the latest version of `react-dnd` and import `DndProvider`.

### Before (v1.x)

```jsx
import { Tree } from "@minoru/react-dnd-treeview";

function App() {
  return <Tree {...props} />;
}
```

### After (v2.x)

```jsx
import { DndProvider } from "react-dnd";
import {
  Tree,
  MultiBackend,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";

function App() {
  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree {...props} />
    </DndProvider>
  );
}
```
