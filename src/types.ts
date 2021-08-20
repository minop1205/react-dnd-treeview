import { ElementType, ReactElement } from "react";
import { XYCoord } from "react-dnd";

export type NodeModel<T = unknown> = {
  id: number | string;
  parent: number | string;
  text: string;
  droppable?: boolean;
  data?: T;
};

export type DragItem<T> = NodeModel<T> & {
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
) => ReactElement;

export type ClickHandler = (data: NodeModel) => void;

export type DropHandler = (
  id: NodeModel["id"],
  parent: NodeModel["id"],
  index: number
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
  placeholder?: string;
};

export type ToggleHandler = (id: NodeModel["id"]) => void;

export type SortCallback = (a: NodeModel, b: NodeModel) => number;

export type DragLayerMonitorProps<T> = {
  item: DragItem<T>;
  clientOffset: XYCoord | null;
  isDragging: boolean;
};

export type DragPreviewRender<T> = (
  monitorProps: DragLayerMonitorProps<T>
) => ReactElement;

export type PlaceholderRenderParams = {
  depth: number;
};

export type PlaceholderRender<T> = (
  node: NodeModel<T>,
  params: PlaceholderRenderParams
) => ReactElement;

export type DragOverProps = {
  onDragEnter: () => void;
  onDragLeave: () => void;
  onDrop: () => void;
};

export type OpenHandler = (
  targetIds: NodeModel["id"] | NodeModel["id"][]
) => void;

export type CloseHandler = (
  targetIds: NodeModel["id"] | NodeModel["id"][]
) => void;

export type InitialOpen = boolean | NodeModel["id"][];

export type DragSourceElement = EventTarget | null;

export type DragControlState = {
  isLock: boolean;
  lock: () => void;
  unlock: () => void;
};

export type PlaceholderState = {
  dropTargetId: NodeModel["id"] | undefined;
  index: number | undefined;
  showPlaceholder: (parentId: NodeModel["id"], index: number) => void;
  hidePlaceholder: () => void;
};

export type TreeStateBase<T> = {
  tree: NodeModel<T>[];
  rootId: NodeModel["id"];
  classes?: Classes;
  render: NodeRender<T>;
  dragPreviewRender?: DragPreviewRender<T>;
  placeholderRender?: PlaceholderRender<T>;
};

export type TreeState<T> = TreeStateBase<T> & {
  listComponent: ElementType;
  listItemComponent: ElementType;
  placeholderComponent: ElementType;
  sort: SortCallback | boolean;
  insertDroppableFirst: boolean;
  dropTargetOffset: number;
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
  placeholderComponent?: ElementType;
  sort?: SortCallback | boolean;
  insertDroppableFirst?: boolean;
  dropTargetOffset?: number;
  initialOpen?: InitialOpen;
  onDrop: (
    tree: NodeModel<T>[],
    options: {
      dragSourceId: NodeModel["id"];
      dropTargetId: NodeModel["id"];
      dragSource: NodeModel<T> | undefined;
      dropTarget: NodeModel<T> | undefined;
    }
  ) => void;
  canDrop?: (
    tree: NodeModel<T>[],
    options: {
      dragSourceId: NodeModel["id"];
      dropTargetId: NodeModel["id"];
      dragSource: NodeModel<T> | undefined;
      dropTarget: NodeModel<T> | undefined;
    }
  ) => boolean | void;
  canDrag?: (node: NodeModel<T> | undefined) => boolean;
};

export type TreeMethods = {
  open: OpenHandler;
  close: CloseHandler;
  openAll(): void;
  closeAll(): void;
};
