# Change Log

## 3.4.1

_Dec 31, 2022_

- Improved performance when `enableAnimateExpand` is `true`.

## 3.4.0

_Nov 29, 2022_

### Added

- Added `enableAnimateExpand` API to support open/close animation.

## 3.3.0

_Nov 2, 2022_

### Added

- Added `relativeIndex` to options passed `onDrop` callback.

## 3.2.2

_Oct 31, 2022_

### Fixed

- Nodes may not be draggable.

## 3.2.1

_Oct 19, 2022_

### Fixed

- The URL of the demo page listed in the README is incorrect.

## 3.2.0

_Oct 05, 2022_

### Added

- Added `handleRef` to Render params to support dragging with handle.
- Added React 17.x and React DnD 15.x to peer dependencies.

### Changed

- Changed all parameters of `getBackendOptions` to optional.

### Fixed

- Rollup bundling process does not handle "~" alias.

## 3.1.0

_Sep 08, 2022_

### Added

- Added `onDragStart` and `onDragend` APIs for handling the start and end of node dragging.
- Added Multiple drag sample.

## 3.0.0

_Aug 12, 2022_

### Added

- Nodes can now be added by dropping elements outside the tree, files, selected text, etc. into the tree.

### Breaking changes

- Among the `options` passed to the `onDrop` callback, `dragSourceId` and `dragSource` are now optional.<br>If the drag source is an element external to `DndProvider` or a file or selected text, these will be `undefined`.

## 2.0.2

_June 29, 2022_

### Changed

- If the `initialOpen` property is updated, the open state of the tree will be updated.

## 2.0.1

_June 15, 2022_

### Fixed

- Error using require to import from `react-dnd` and `react-dnd-html5-backend`.

  Since `react-dnd` and `react-dnd-html5-backend` are now distributed only in ESM format,
  this package is also provided only in ESM format and the package type has been changed to module.

## 2.0.0

_May 15, 2022_

### Added

- Migrated examples to Storybook.

### Breaking changes

- Exclude `react-dnd` from this package

  `react-dnd` is no longer included in this package, so users of this package must separately install the latest version of `react-dnd` and import `DndProvider`.

## 1.6.1

_Jan 07, 2022_

### Fixed

- DragPreview component is momentarily displayed in the upper left corner of the screen after the drag operation is completed.

## 1.6.0

_Nov 18, 2021_

### Added

- Added `isDragging` and `isDropTarget` flags to the options passed to the render callback.
- Added a reference to the wrapper element to the options passed to the render callback. (`options.containerRef`)

## 1.5.11

_Nov 08, 2021_

### Added

- If the `sort` property is set to `false`, add an `destinationIndex` property to the options passed to the `onDrop` callback to indicate where to move the node.
- A utility function has been added to get descendant nodes.
- Added demos for adding, removing, and duplicating nodes.

### Changed

- Update sample code of basic usage.
- If the `sort` property is not `false`, then the order of the tree array passed to the `onDrop` callback will be preserved.
- The new node array passed to the `onDrop` callback is no longer read-only.

## 1.5.10

_Oct 27, 2021_

### Fixed

- generic type cannot be used in sort callback.

## 1.5.9

_Oct 07, 2021_

### Added

- add `rootProps` API.

## 1.5.7

_Oct 01, 2021_

### Fixed

- react-dnd version is mismatch with dependent packages.

## 1.5.6

_Sept 29, 2021_

### Fixed

- dragging not possible after editing a node without hovering in Firefox or Safari.

## 1.5.4

_Sept 24, 2021_

### Fixed

- unable to install in npm version 7.

## 1.5.3

_Sept 08, 2021_

### Added

- add `classes.listItem` property for styling node wrapper.

## 1.5.1

_Aug 22, 2021_

### Added

- add `onChangeOpen` API.

## 1.5.0

_Aug 19, 2021_

### Added

- add APIs for manual sort and placeholder
- add open / close methods for control open state of nodes.

### Fixed

- type inference for custom data types is not working.

## 1.4.3

_July 17, 2021_

### Fixed

- incorrect parameters passed to the canDrop callback.
- mouse cursor becomes the default pointer when hovering over an area that cannot be dropped.

## 1.4.2

_July 08, 2021_

### Added

- add `canDrag` API to control dragging.

### Fixed

- unable to select text in a text field in a node by mouse dragging.

## 1.4.1

_June 02, 2021_

### Added

- support touch device.

## 1.3.2

_Apr 22, 2021_

### Security

- update all dependencies.

## 1.3.1

_Apr 20, 2021_

### Fixed

- fail drop into root container when `rootId` is string.
- dropTarget in canDrop parameter is incrrect.

## 1.3.0

_Apr 12, 2021_

### Added

- add `canDrop` API.

## 1.2.0

_Apr 05, 2021_

### Added

- add `hasChild` argument to render function.

## 1.1.0

_Apr 02, 2021_

### Added

- add initialOpen API to control the opening and closing state of the node in the initial state of the component.
- add sort API to control the sorting of nodes.

## 1.0.0

_Jan 25, 2021_

Initial major release.
