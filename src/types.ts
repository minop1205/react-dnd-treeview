import { ElementType } from "react";
import { XYCoord } from "react-dnd";

export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export type NodeModel<T = unknown> = {
  id: number | string;
  parent: number | string;
  text: string;
  droppable?: boolean;
  data?: T;
};

export type DragItem<T = unknown> = NodeModel<T> & {
  type: symbol;
  ref: React.MutableRefObject<HTMLElement>;
};

export type RenderParams = {
  depth: number;
  isOpen: boolean;
  draggable: boolean;
  hasChild: boolean;
  onToggle(): void;
};

export type NodeRender<T> = (
  node: NodeModel<T>,
  params: RenderParams
) => React.ReactElement;

export type ClickHandler = (data: NodeModel) => void;

export type DropHandler = (
  id: NodeModel["id"],
  parent: NodeModel["id"]
) => void;

export type CanDropHandler = (
  id: NodeModel["id"],
  parent: NodeModel["id"]
) => boolean | void;

export type CanDragHandler = (id: NodeModel["id"]) => boolean;

export type Classes = {
  root?: string;
  container?: string;
  dropTarget?: string;
  draggingSource?: string;
};

export type ToggleHandler = (id: NodeModel["id"]) => void;

export type SortCallback = (a: NodeModel, b: NodeModel) => number;

export type DragLayerMonitorProps<T = unknown> = {
  item: DragItem<T>;
  clientOffset: XYCoord | null;
  isDragging: boolean;
};

export type DragPreviewRender = (
  monitorProps: DragLayerMonitorProps
) => React.ReactElement;

export type DragOverProps = {
  onDragEnter: () => void;
  onDragLeave: () => void;
  onDrop: () => void;
};

export type OpenIdsHandlers = {
  openAll(): void;
  closeAll(): void;
};

export type InitialOpen = boolean | NodeModel["id"][];

export type DragSourceElement = EventTarget | null;

export type DragControlState = {
  isLock: boolean;
  lock: () => void;
  unlock: () => void;
};

export type PlaceholderState = {
  parentId: NodeModel["id"];
  index: number;
  visible: boolean;
  showPlaceholder: (parentId: NodeModel["id"], index: number) => void;
  hidePlaceholder: () => void;
};

export type TreeStateBase<T> = {
  tree: NodeModel<T>[];
  rootId: NodeModel["id"];
  classes?: Classes;
  render: NodeRender<T>;
  dragPreviewRender?: DragPreviewRender;
};

export type TreeState<T> = TreeStateBase<T> & {
  listComponent: ElementType;
  listItemComponent: ElementType;
  sort: SortCallback | boolean;
  initialOpen: InitialOpen;
  openIds: NodeModel["id"][];
  onDrop: DropHandler;
  canDrop?: CanDropHandler;
  canDrag?: CanDragHandler;
  onToggle: ToggleHandler;
};

export type TreeProps<T> = TreeStateBase<T> & {
  listComponent?: ElementType;
  listItemComponent?: ElementType;
  sort?: SortCallback | boolean;
  initialOpen?: InitialOpen;
  onDrop: (
    tree: NodeModel[],
    options: {
      dragSourceId: NodeModel["id"];
      dropTargetId: NodeModel["id"];
      dragSource: NodeModel | undefined;
      dropTarget: NodeModel | undefined;
    }
  ) => void;
  canDrop?: (
    tree: NodeModel[],
    options: {
      dragSourceId: NodeModel["id"];
      dropTargetId: NodeModel["id"];
      dragSource: NodeModel | undefined;
      dropTarget: NodeModel | undefined;
    }
  ) => boolean | void;
  canDrag?: (node: NodeModel | undefined) => boolean;
};
