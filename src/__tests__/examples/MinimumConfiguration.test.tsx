import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { composeStories } from "@storybook/testing-react";
import * as stories from "~/stories/examples/MinimumConfiguration/MinimumConfiguration.stories";
import { TestProvider } from "./TestProvider";
import { dragAndDrop } from "./dragAndDrop";

const { MinimumConfigurationStory } = composeStories(stories);

describe("Stories test", () => {
  const renderTree = () =>
    render(
      <TestProvider>
        <MinimumConfigurationStory {...MinimumConfigurationStory.args} />
      </TestProvider>
    );

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
});
