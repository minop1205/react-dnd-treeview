import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { composeStories } from "@storybook/testing-react";
import * as stories from "~/stories/examples/MinimumConfiguration/MinimumConfiguration.stories";
import { FileProperties } from "~/stories/types";
import { TreeProps } from "~/types";
import { TestProvider } from "./TestProvider";
import { dragAndDrop } from "./dragAndDrop";

const { MinimumConfigurationStory } = composeStories(stories);

describe("Stories test", () => {
  const renderTree = (options: Partial<TreeProps<FileProperties>> = {}) =>
    render(
      <TestProvider>
        <MinimumConfigurationStory
          {...MinimumConfigurationStory.args}
          {...options}
        />
      </TestProvider>
    );

  test("count nodes", () => {
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

  test("drag and drop: File 3 into Folder 1", async () => {
    renderTree();
    const items = screen.getAllByRole("listitem");
    const dragSource = items[2];
    const dropTarget = items[0];

    await dragAndDrop(dragSource, dropTarget);
    expect(screen.queryByText("File 3")).toBeNull();

    fireEvent.click(screen.getAllByText("[+]")[0]);
    expect(screen.queryByText("File 3")).toBeInTheDocument();
  });

  test("drag and drop: File 3 into Folder 2 and Folder 2 into Folder 1", async () => {
    renderTree();

    let items = screen.getAllByRole("listitem");
    let src = items[2];
    let dst = items[1];

    await dragAndDrop(src, dst);
    expect(screen.queryByText("File 3")).toBeNull();

    items = screen.getAllByRole("listitem");
    src = items[1];
    dst = items[0];

    await dragAndDrop(src, dst);
    expect(screen.queryByText("Folder 2")).toBeNull();

    fireEvent.click(screen.getAllByText("[+]")[0]);
    expect(screen.getByText("Folder 2")).toBeInTheDocument();

    fireEvent.click(screen.getAllByText("[+]")[0]);
    expect(screen.getByText("File 3")).toBeInTheDocument();
  });

  test("drag and drop: File 1-2 into root node", async () => {
    renderTree();

    fireEvent.click(screen.getAllByText("[+]")[0]);

    let dragSource = await screen.findByText("File 1-2");
    const dropTarget = await screen.findAllByRole("list");

    expect(dragSource).toHaveStyle("margin-inline-start: 10px");

    await dragAndDrop(dragSource, dropTarget[0]);

    dragSource = await screen.findByText("File 1-2");

    expect(dragSource).toHaveStyle("margin-inline-start: 0");
  });

  test("drag and drop: File 1-2 into root node (using string rootId)", async () => {
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

    await dragAndDrop(src, dst);

    expect(
      screen.getAllByRole("list")[1].contains(screen.getByText("File 1-2"))
    ).toBe(false);

    expect(
      screen.getAllByRole("list")[0].contains(screen.getByText("File 1-2"))
    ).toBe(true);
  });

  test("cancel dnd with press esc key", async () => {
    renderTree();

    const items = screen.getAllByRole("listitem");
    const dragSource = items[2];
    const dropTarget = items[0];

    await act(
      () =>
        new Promise((r) => {
          fireEvent.dragStart(dragSource);
          fireEvent.dragEnter(dropTarget);
          fireEvent.dragOver(dropTarget);

          setTimeout(r, 20);
        })
    );

    userEvent.keyboard("{esc}");
    expect(screen.queryByText("File 3")).toBeInTheDocument();
  });
});
