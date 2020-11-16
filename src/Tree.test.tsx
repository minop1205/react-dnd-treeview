import React from "react";
import { render, screen } from "@testing-library/react";
import { Tree } from "./Tree";
import { NodeModel } from "./types";

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

  // screen.debug();

  test("count of node items", () => {
    expect(container.querySelectorAll("li").length).toBe(3);
  });
});
