# Migration Guide

## v1 to v2

`react-dnd` is no longer included in this package, so users of this package must separately install the latest version of `react-dnd` and import `DndProvider`.

### Before (v1)

```
import { Tree } from "@minoru/react-dnd-treeview";

function App() {
  return (
    <Tree {...props} />
  );
}
```

### After (v2)

```
import { DndProvider } from "react-dnd";
import {
  Tree,
  MultiBackend,
  getBackendOptions
} from "@minoru/react-dnd-treeview";

function App() {
  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree {...props} />
    </DndProvider>
  );
}
```
