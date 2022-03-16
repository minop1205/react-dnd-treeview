import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { composeStories } from "@storybook/testing-react";
import * as stories from "~/stories/examples/SelectNode/SelectNode.stories";
import { FileProperties } from "~/stories/types";
import { TreeProps } from "~/types";
import { TestProvider } from "./TestProvider";

const { SelectNodeStory } = composeStories(stories);

describe("Select node", () => {
  const renderStory = (options: Partial<TreeProps<FileProperties>> = {}) =>
    render(
      <TestProvider>
        <SelectNodeStory {...SelectNodeStory.args} {...options} />
      </TestProvider>
    );

  test("select nodes", () => {
    renderStory();

    const selectedNodeLabel = screen.getByTestId("selected-node");

    expect(selectedNodeLabel.textContent).toBe("none");

    fireEvent.click(screen.getByText("Folder 1"));

    expect(selectedNodeLabel.textContent).toBe("Folder 1");

    fireEvent.click(screen.getByText("File 3"));

    expect(selectedNodeLabel.textContent).toBe("File 3");
  });
});
