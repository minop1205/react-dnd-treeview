import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { composeStories } from "@storybook/testing-react";
import * as stories from "~/stories/examples/CustomDragPreview/CustomDragPreview.stories";
import { FileProperties } from "~/stories/types";
import { TreeProps } from "~/types";
import { TestProvider } from "./TestProvider";

const { CustomDragPreviewStory } = composeStories(stories);

describe("Custom drag preview", () => {
  const renderTree = (options: Partial<TreeProps<FileProperties>> = {}) =>
    render(
      <TestProvider>
        <CustomDragPreviewStory {...CustomDragPreviewStory.args} {...options} />
      </TestProvider>
    );

  test("show preview during dragging", async () => {
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

    expect(
      await screen.findByTestId("custom-drag-preview")
    ).toBeInTheDocument();

    fireEvent.drop(dropTarget);
    fireEvent.dragLeave(dropTarget);
    fireEvent.dragEnd(dragSource);
    fireEvent.dragEnd(window);

    expect(screen.queryByTestId("custom-drag-preview")).toBeNull();
  });

  test("hide preview when drag is canceled", async () => {
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

    expect(
      await screen.findByTestId("custom-drag-preview")
    ).toBeInTheDocument();

    fireEvent.dragEnd(window);

    expect(screen.queryByTestId("custom-drag-preview")).toBeNull();
  });
});
