import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Tree } from "../Tree";
import { NodeModel } from "../types";

const treeData: NodeModel[] = [
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

const TestTree: React.FC = () => {
  const [tree, setTree] = useState<NodeModel[]>(treeData);
  const handleDrop = (newTree: NodeModel[]) => setTree(newTree);

  return (
    <Tree
      tree={tree}
      rootId={0}
      render={(node, { depth, isOpen, onToggle }) => (
        <div style={{ marginInlineStart: depth * 10 }}>
          {node.droppable && (
            <span onClick={onToggle}>{isOpen ? "[-]" : "[+]"}</span>
          )}
          {node.text}
        </div>
      )}
      dragPreviewRender={(monitorProps) => <div>{monitorProps.item.text}</div>}
      onDrop={handleDrop}
    />
  );
};

const dragAndDrop = (src: Element, dst: Element) => {
  fireEvent.dragStart(src);
  fireEvent.dragEnter(dst);
  fireEvent.drop(dst);
  fireEvent.dragLeave(dst);
  fireEvent.dragEnd(src);
  fireEvent.dragEnd(window);
};

describe("Tree", () => {
  const renderTree = () => {
    const { container } = render(<TestTree />);
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

  test("drag and drop: File 1-2 to root node", () => {
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
});
