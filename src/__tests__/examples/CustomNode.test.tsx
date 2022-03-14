import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { composeStories } from "@storybook/testing-react";
import * as stories from "~/stories/examples/CustomNode/CustomNode.stories";
import { FileProperties } from "~/stories/types";
import { TreeProps } from "~/types";
import { TestProvider } from "./TestProvider";

const { CustomNodeStory } = composeStories(stories);

describe("Custom node", () => {
  const renderTree = (options: Partial<TreeProps<FileProperties>> = {}) =>
    render(
      <TestProvider>
        <CustomNodeStory {...CustomNodeStory.args} {...options} />
      </TestProvider>
    );

  test("count icons", () => {
    renderTree();

    const arrowIcons = screen.getAllByTestId("ArrowRightIcon");
    const folderIcons = screen.getAllByTestId("FolderIcon");
    const imageIcons = screen.getAllByTestId("ImageIcon");

    expect(arrowIcons.length).toBe(2);
    expect(folderIcons.length).toBe(2);
    expect(imageIcons.length).toBe(1);
  });
});
