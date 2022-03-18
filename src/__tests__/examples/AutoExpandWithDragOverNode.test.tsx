import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { composeStories } from "@storybook/testing-react";
import * as stories from "~/stories/examples/AutoExpandWithDragOverNode/AutoExpandWithDragOverNode.stories";
import { FileProperties } from "~/stories/types";
import { TreeProps } from "~/types";
import { TestProvider } from "./TestProvider";

const { AutoExpandWithDragOverNodeStory } = composeStories(stories);

describe("Auto expand with drag over node", () => {
  const renderStory = (options: Partial<TreeProps<FileProperties>> = {}) =>
    render(
      <TestProvider>
        <AutoExpandWithDragOverNodeStory
          {...AutoExpandWithDragOverNodeStory.args}
          {...options}
        />
      </TestProvider>
    );

  test("Auto expand with drag over node", async () => {
    renderStory();

    const items = screen.getAllByRole("listitem");
    const dragSource = items[2];
    const dropTarget = items[0].firstChild;

    if (!dropTarget) {
      return;
    }

    await act(
      () =>
        new Promise((r) => {
          fireEvent.dragStart(dragSource);
          fireEvent.dragEnter(dropTarget);
          fireEvent.dragOver(dropTarget);

          window.setTimeout(r, 700);
        })
    );

    expect(await screen.findByText("File 1-2")).toBeInTheDocument();
  });
});
