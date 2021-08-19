# Change Log

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
