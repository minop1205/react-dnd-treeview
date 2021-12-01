import React, {
  useState,
  useRef,
  useEffect,
  ReactElement,
  PropsWithChildren,
} from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Tree } from "../Tree";
import {
  NodeModel,
  SortCallback,
  TreeProps,
  NodeRender,
  TreeMethods,
  RenderParams,
} from "../types";

function createSampleData<T>() {
  const treeData = [
    {
      id: 1,
      parent: 0,
      droppable: true,
      text: "Folder 1",
    },
    {
      id: 2,
      parent: 1,
      droppable: false,
      text: "File 1-1",
      data: {
        fileType: "csv",
        fileSize: "0.5MB",
      },
    },
    {
      id: 3,
      parent: 1,
      droppable: false,
      text: "File 1-2",
      data: {
        fileType: "text",
        fileSize: "4.8MB",
      },
    },
    {
      id: 4,
      parent: 0,
      droppable: true,
      text: "Folder 2",
    },
    {
      id: 5,
      parent: 4,
      droppable: true,
      text: "Folder 2-1",
    },
    {
      id: 6,
      parent: 5,
      droppable: false,
      text: "File 2-1-1",
      data: {
        fileType: "image",
        fileSize: "2.1MB",
      },
    },
    {
      id: 7,
      parent: 0,
      droppable: false,
      text: "File 3",
      data: {
        fileType: "image",
        fileSize: "0.8MB",
      },
    },
  ];

  return treeData as NodeModel<T>[];
}

type Props<T> = PropsWithChildren<Partial<TreeProps<T>>>;

const TestTree = <T extends unknown>(props: Props<T>): ReactElement => {
  const [tree, setTree] = useState<NodeModel<T>[]>(
    props.tree || createSampleData<T>()
  );

  const handleDrop = (newTree: NodeModel<T>[]) => setTree(newTree);

  return (
    <Tree
      rootId={0}
      render={(node, { depth, isOpen, onToggle }) => (
        <div style={{ marginInlineStart: depth * 10 }}>
          {node.droppable && (
            <span onClick={onToggle}>{isOpen ? "[-]" : "[+]"}</span>
          )}
          {node.text}
        </div>
      )}
      dragPreviewRender={(monitorProps) => (
        <div data-testid="preview">{monitorProps.item.text}</div>
      )}
      onDrop={handleDrop}
      {...props}
      tree={tree}
    />
  );
};

const dragAndDrop = (src: Element, dst: Element) => {
  fireEvent.dragStart(src);
  fireEvent.dragEnter(dst);
  fireEvent.dragOver(dst);
  fireEvent.drop(dst);
  fireEvent.dragLeave(dst);
  fireEvent.dragEnd(src);
  fireEvent.dragEnd(window);
};

describe("Tree", () => {
  const renderTree = <T extends unknown>(props: Partial<TreeProps<T>> = {}) => {
    const { container } = render(<TestTree {...props} />);
    return container;
  };

  test("count of node items", () => {
    renderTree();
    expect(screen.getAllByRole("listitem").length).toBe(3);
  });

  test("open and close first node", () => {
    renderTree();
    expect(screen.queryByText("File 1-1")).toBeNull();

    fireEvent.click(screen.getAllByText("[+]")[0]);
    expect(screen.getByText("File 1-1")).toBeInTheDocument();

    fireEvent.click(screen.getAllByText("[-]")[0]);
    expect(screen.queryByText("File 1-1")).toBeNull();
  });

  test("drag and drop: File 3 into Folder 1", () => {
    renderTree();
    const items = screen.getAllByRole("listitem");
    const dragSource = items[2];
    const dropTarget = items[0];

    dragAndDrop(dragSource, dropTarget);
    expect(screen.queryByText("File 3")).toBeNull();

    fireEvent.click(screen.getAllByText("[+]")[0]);
    expect(screen.queryByText("File 3")).toBeInTheDocument();
  });

  test("drag and drop: File 3 into Folder 2 and Folder 2 into Folder 1", () => {
    renderTree();

    let items = screen.getAllByRole("listitem");
    let src = items[2];
    let dst = items[1];

    dragAndDrop(src, dst);
    expect(screen.queryByText("File 3")).toBeNull();

    items = screen.getAllByRole("listitem");
    src = items[1];
    dst = items[0];

    dragAndDrop(src, dst);
    expect(screen.queryByText("Folder 2")).toBeNull();

    fireEvent.click(screen.getAllByText("[+]")[0]);
    expect(screen.getByText("Folder 2")).toBeInTheDocument();

    fireEvent.click(screen.getAllByText("[+]")[0]);
    expect(screen.getByText("File 3")).toBeInTheDocument();
  });

  test("drag and drop: File 1-2 into root node", () => {
    renderTree();

    fireEvent.click(screen.getAllByText("[+]")[0]);

    expect(
      screen.getAllByRole("list")[1].contains(screen.getByText("File 1-2"))
    ).toBe(true);

    const src = screen.getAllByRole("listitem")[2];
    const dst = screen.getAllByRole("list")[0];

    dragAndDrop(src, dst);

    expect(
      screen.getAllByRole("list")[1].contains(screen.getByText("File 1-2"))
    ).toBe(false);

    expect(
      screen.getAllByRole("list")[0].contains(screen.getByText("File 1-2"))
    ).toBe(true);
  });

  test("drag and drop: File 1-2 into root node (using string rootId)", () => {
    const tree = [
      {
        id: 1,
        parent: "foo",
        droppable: true,
        text: "Folder 1",
      },
      {
        id: 2,
        parent: 1,
        droppable: false,
        text: "File 1-1",
      },
      {
        id: 3,
        parent: 1,
        droppable: false,
        text: "File 1-2",
      },
    ];

    renderTree({ tree, rootId: "foo", initialOpen: true });

    const src = screen.getAllByRole("listitem")[2];
    const dst = screen.getAllByRole("list")[0];

    dragAndDrop(src, dst);

    expect(
      screen.getAllByRole("list")[1].contains(screen.getByText("File 1-2"))
    ).toBe(false);

    expect(
      screen.getAllByRole("list")[0].contains(screen.getByText("File 1-2"))
    ).toBe(true);
  });

  test("drag and drop: File 1-2 to root node with falsy canDrop should not call onDrop", () => {
    const onDrop = jest.fn();
    const canDrop = jest.fn().mockReturnValue(false);

    renderTree({
      onDrop,
      canDrop,
    });

    fireEvent.click(screen.getAllByText("[+]")[0]);

    expect(
      screen.getAllByRole("list")[1].contains(screen.getByText("File 1-2"))
    ).toBe(true);

    const src = screen.getAllByRole("listitem")[2];
    const dst = screen.getAllByRole("list")[0];

    dragAndDrop(src, dst);

    expect(canDrop).toHaveBeenCalled();
    expect(onDrop).not.toHaveBeenCalled();
  });

  test("drag and drop: Folder 2 to Folder 2 should not call onDrop", () => {
    const onDrop = jest.fn();

    renderTree({
      onDrop,
    });

    fireEvent.click(screen.getAllByText("[+]")[0]);

    const src = screen.getAllByRole("listitem")[3];
    const dst = src;

    dragAndDrop(src, dst);

    expect(onDrop).not.toHaveBeenCalled();
  });

  test("drag and drop: Folder 2 to Folder 2 with canDrop callback", () => {
    const onDrop = jest.fn();
    const canDrop = jest.fn().mockReturnValue(true);

    renderTree({
      onDrop,
      canDrop,
    });

    fireEvent.click(screen.getAllByText("[+]")[0]);

    const src = screen.getAllByRole("listitem")[3];
    const dst = src;

    dragAndDrop(src, dst);

    expect(canDrop).toHaveBeenCalled();

    expect(onDrop).toHaveBeenCalled();
  });

  test("show drag preview while dragging list item", () => {
    renderTree();

    const src = screen.getAllByRole("listitem")[2];

    expect(screen.queryByTestId("preview")).toBeNull();

    fireEvent.dragStart(src);

    expect(screen.getByTestId("preview")).toBeInTheDocument();

    fireEvent.dragEnd(window);

    expect(screen.queryByTestId("preview")).toBeNull();
  });

  test("sort items by id descending order", () => {
    const sortCallback: SortCallback = (a, b) => {
      if (a.id > b.id) {
        return -1;
      } else if (a.id < b.id) {
        return 1;
      }

      return 0;
    };

    renderTree({ sort: sortCallback });

    const nodes = screen.getAllByRole("listitem");
    expect(nodes[0].contains(screen.getByText("Folder 2"))).toBe(true);
    expect(nodes[1].contains(screen.getByText("Folder 1"))).toBe(true);
  });

  test("disable sorting", () => {
    const treeItems: NodeModel[] = [
      {
        id: 1,
        parent: 0,
        droppable: false,
        text: "File 1",
      },
      {
        id: 3,
        parent: 0,
        droppable: false,
        text: "File 3",
      },
      {
        id: 2,
        parent: 0,
        droppable: false,
        text: "File 2",
      },
    ];

    renderTree({ tree: treeItems, sort: false });

    const nodes = screen.getAllByRole("listitem");
    expect(nodes[0].contains(screen.getByText("File 1"))).toBe(true);
    expect(nodes[1].contains(screen.getByText("File 3"))).toBe(true);
    expect(nodes[2].contains(screen.getByText("File 2"))).toBe(true);
  });

  test("open all parent nodes on component initializing", () => {
    renderTree({ initialOpen: true });

    expect(screen.getByText("File 1-1")).toBeInTheDocument();
    expect(screen.getByText("Folder 2-1")).toBeInTheDocument();
    expect(screen.getByText("File 2-1-1")).toBeInTheDocument();
  });

  test("open specific parent nodes on component initializing", () => {
    renderTree({ initialOpen: [1] });

    expect(screen.getByText("File 1-1")).toBeInTheDocument();
    expect(screen.queryByText("Folder 2-1")).toBeNull();
  });

  test("show text that has child or not to each nodes", () => {
    const customRender: NodeRender<unknown> = (node, { hasChild }) => (
      <div>{`${node.text} ${hasChild ? "hasChild" : ""}`}</div>
    );

    renderTree({
      render: customRender,
      initialOpen: true,
    });

    expect(screen.getByText("Folder 1 hasChild")).toBeInTheDocument();
    expect(screen.queryByText("File 1-1 hasChild")).toBeNull();
    expect(screen.getByText("Folder 2-1 hasChild")).toBeInTheDocument();
    expect(screen.queryByText("File 3 hasChild")).toBeNull();
  });

  test("disallow dragging of File3", () => {
    renderTree({
      canDrag: (node) => node?.text !== "File 3",
    });

    const items = screen.getAllByRole("listitem");
    const dragSource = items[2];

    expect(fireEvent.dragStart(dragSource)).toBe(false);
  });

  test("show draggable property of each node", () => {
    const customRender: NodeRender<unknown> = (node, { draggable }) => (
      <div>{`${node.text} ${draggable ? "draggable" : "not draggable"}`}</div>
    );

    renderTree({
      render: customRender,
      canDrag: (node) => node?.text !== "File 3",
    });

    expect(screen.getByText("Folder 1 draggable")).toBeInTheDocument();
    expect(screen.getByText("Folder 2 draggable")).toBeInTheDocument();
    expect(screen.getByText("File 3 not draggable")).toBeInTheDocument();
  });

  test("check openIds with onChangeOpen callback", () => {
    let openIds: NodeModel["id"][] = [];

    renderTree({
      onChangeOpen: (newOpenIds) => {
        openIds = newOpenIds;
      },
    });

    fireEvent.click(screen.getAllByText("[+]")[0]);
    fireEvent.click(screen.getAllByText("[+]")[0]);
    fireEvent.click(screen.getAllByText("[+]")[0]);
    expect(openIds.join(",")).toBe("1,4,5");

    fireEvent.click(screen.getAllByText("[-]")[0]);
    fireEvent.click(screen.getAllByText("[-]")[0]);
    expect(openIds.join(",")).toBe("5");
  });

  test("open / close nodes using public methods", () => {
    const App: React.FC = () => {
      const ref = useRef<TreeMethods>(null);

      const handleOpenAll = () => {
        if (ref.current?.openAll) {
          ref.current.openAll();
        }
      };

      const handleCloseAll = () => {
        if (ref.current?.closeAll) {
          ref.current.closeAll();
        }
      };

      const handleOpenSingle = () => {
        if (ref.current?.open) {
          ref.current.open(4);
        }
      };

      const handleOpenMultiple = () => {
        if (ref.current?.open) {
          ref.current.open([4, 5]);
        }
      };

      const handleCloseSingle = () => {
        if (ref.current?.close) {
          ref.current.close(4);
        }
      };

      const handleCloseMultiple = () => {
        if (ref.current?.close) {
          ref.current.close([4, 5]);
        }
      };

      return (
        <div>
          <Tree
            ref={ref}
            rootId={0}
            tree={createSampleData()}
            render={(node, { depth, isOpen, onToggle }) => (
              <div style={{ marginInlineStart: depth * 10 }}>
                {node.droppable && (
                  <span onClick={onToggle}>{isOpen ? "[-]" : "[+]"}</span>
                )}
                {node.text}
              </div>
            )}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onDrop={() => {}}
          />
          <button onClick={handleOpenAll}>Open All</button>
          <button onClick={handleCloseAll}>Close All</button>
          <button onClick={handleOpenSingle}>Open Single</button>
          <button onClick={handleOpenMultiple}>Open Multiple</button>
          <button onClick={handleCloseSingle}>Close Single</button>
          <button onClick={handleCloseMultiple}>Close Multiple</button>
        </div>
      );
    };

    render(<App />);

    const btnOpenAll = screen.getByText("Open All");
    const btnCloseAll = screen.getByText("Close All");
    const btnOpenSingle = screen.getByText("Open Single");
    const btnOpenMultiple = screen.getByText("Open Multiple");
    const btnCloseSingle = screen.getByText("Close Single");
    const btnCloseMultiple = screen.getByText("Close Multiple");

    expect(screen.queryByText("Folder 2-1")).toBeNull();
    expect(screen.queryByText("File 2-1-1")).toBeNull();

    fireEvent.click(btnOpenAll);

    expect(screen.getByText("Folder 2-1")).toBeInTheDocument();
    expect(screen.getByText("File 2-1-1")).toBeInTheDocument();

    fireEvent.click(btnCloseAll);

    expect(screen.queryByText("Folder 2-1")).toBeNull();
    expect(screen.queryByText("File 2-1-1")).toBeNull();

    fireEvent.click(btnOpenSingle);

    expect(screen.getByText("Folder 2-1")).toBeInTheDocument();
    expect(screen.queryByText("File 2-1-1")).toBeNull();

    fireEvent.click(btnCloseAll);
    fireEvent.click(btnOpenMultiple);

    expect(screen.getByText("Folder 2-1")).toBeInTheDocument();
    expect(screen.getByText("File 2-1-1")).toBeInTheDocument();

    fireEvent.click(btnCloseSingle);

    expect(screen.queryByText("Folder 2-1")).toBeNull();
    expect(screen.queryByText("File 2-1-1")).toBeNull();

    fireEvent.click(btnOpenAll);
    fireEvent.click(btnCloseMultiple);

    expect(screen.queryByText("Folder 2-1")).toBeNull();
    expect(screen.queryByText("File 2-1-1")).toBeNull();
  });

  test("set className and onClick handler to rootProps", () => {
    let counter = 0;

    renderTree({
      rootProps: {
        className: "foo",
        onClick: (e) => {
          if (e.target === e.currentTarget) {
            counter += 1;
          }
        },
      },
      classes: {
        root: "bar",
      },
    });

    const root = screen.getByRole("list");
    const listItem = screen.getByText("File 3");

    expect(root.className).toBe("bar foo");
    fireEvent.click(listItem);
    expect(counter).toBe(0);
    fireEvent.click(root);
    expect(counter).toBe(1);
  });

  test("display drag source and drop target while dragging node", () => {
    const customRender: NodeRender<unknown> = (
      node,
      { depth, isDragging, isDropTarget, isOpen, onToggle }
    ) => {
      let text = node.text;

      if (isDragging) {
        text = `${text}(dragSource)`;
      }

      if (isDropTarget) {
        text = `${text}(dropTarget)`;
      }

      return (
        <div style={{ marginInlineStart: depth * 10 }}>
          {node.droppable && (
            <span onClick={onToggle}>{isOpen ? "[-]" : "[+]"}</span>
          )}
          {text}
        </div>
      );
    };

    renderTree({
      render: customRender,
    });

    fireEvent.click(screen.getAllByText("[+]")[0]);

    const items = screen.getAllByRole("listitem");
    const src = items[4];
    const dst = items[0];

    fireEvent.dragStart(src);

    expect(src.textContent).toBe("File 3(dragSource)");

    fireEvent.dragEnter(dst);
    fireEvent.dragOver(dst);

    expect(dst.textContent).toBe("[-]Folder 1(dropTarget)File 1-1File 1-2");
  });

  test("detect dragstart and dragend events", () => {
    const CustomNode: React.FC<{
      node: NodeModel;
      options: RenderParams;
      onDragStart: (e: DragEvent) => void;
      onDragEnd: (e: DragEvent) => void;
    }> = (props) => {
      const { text } = props.node;
      const { depth, containerRef } = props.options;

      useEffect(() => {
        containerRef.current?.addEventListener("dragstart", props.onDragStart);
        containerRef.current?.addEventListener("dragend", props.onDragEnd);

        return () => {
          containerRef.current?.removeEventListener(
            "dragstart",
            props.onDragStart
          );
          containerRef.current?.removeEventListener("dragend", props.onDragEnd);
        };
      }, []);

      return <div style={{ marginInlineStart: depth * 10 }}>{text}</div>;
    };

    let isDragging = false;

    renderTree({
      // eslint-disable-next-line react/display-name
      render: (node, params) => (
        <CustomNode
          node={node}
          options={params}
          onDragStart={() => {
            isDragging = true;
          }}
          onDragEnd={() => {
            isDragging = false;
          }}
        />
      ),
    });

    const items = screen.getAllByRole("listitem");
    const src = items[2];
    const dst = items[0];

    fireEvent.dragStart(src);

    expect(isDragging).toBe(true);

    fireEvent.dragEnter(dst);
    fireEvent.dragOver(dst);
    fireEvent.drop(dst);
    fireEvent.dragLeave(dst);
    fireEvent.dragEnd(src);
    fireEvent.dragEnd(window);

    expect(isDragging).toBe(false);
  });
});
