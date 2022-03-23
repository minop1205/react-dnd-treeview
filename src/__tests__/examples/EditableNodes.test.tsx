import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { composeStories } from "@storybook/testing-react";
import * as stories from "~/stories/examples/EditableNodes/EditableNodes.stories";
import { FileProperties } from "~/stories/types";
import { TreeProps } from "~/types";
import { TestProvider } from "./TestProvider";

const { EditableNodesStory } = composeStories(stories);

describe("Editable nodes", () => {
  const renderStory = (options: Partial<TreeProps<FileProperties>> = {}) =>
    render(
      <TestProvider>
        <EditableNodesStory {...EditableNodesStory.args} {...options} />
      </TestProvider>
    );

  test("nodes will be undraggable when hover on text field in the node", async () => {
    renderStory();

    fireEvent.click(screen.getByTestId("btn-edit-1"));

    const input = await screen.findByTestId("input-1");

    userEvent.hover(input);

    const listItem = screen.getAllByRole("listitem")[0];

    expect(listItem.draggable).toBe(false);
  });
});
