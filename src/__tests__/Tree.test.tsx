import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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

describe("Tree", () => {
  const renderTree = () => {
    const { container } = render(
      <Tree
        tree={treeData}
        rootId={0}
        render={(node, { depth, isOpen, onToggle }) => (
          <div style={{ marginInlineStart: depth * 10 }}>
            {node.droppable && (
              <span onClick={onToggle}>{isOpen ? "[-]" : "[+]"}</span>
            )}
            {node.text}
          </div>
        )}
        onDrop={() => console.log("dropped")}
      />
    );

    return container;
  };

  test("count of node items", () => {
    const container = renderTree();
    expect(container.querySelectorAll("li").length).toBe(3);
  });

  test("open and close first node", () => {
    renderTree();
    expect(screen.queryByText("File 1-1")).toBeNull();

    fireEvent.click(screen.getAllByText("[+]")[0]);
    expect(screen.getByText("File 1-1")).toBeInTheDocument();

    fireEvent.click(screen.getAllByText("[-]")[0]);
    expect(screen.queryByText("File 1-1")).toBeNull();
  });

  // test("drag and drop `File 3` to `Folder 2-1`", async () => {
  //   const container = renderTree();

  //   fireEvent.dragStart(container.querySelectorAll("li")[2]);

  //   // fireEvent.dragStart(screen.getByText("File 3"));
  //   // fireEvent.dragEnter(screen.getByText("Folder 2"));

  //   // await waitFor(() =>
  //   //   expect(screen.getByText("Folder 2-1")).toBeInTheDocument()
  //   // );

  //   screen.debug();
  // });
});
