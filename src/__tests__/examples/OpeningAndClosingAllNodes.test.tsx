import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { composeStories } from "@storybook/testing-react";
import * as stories from "~/stories/examples/OpeningAndClosingAllNodes/OpeningAndClosingAllNodes.stories";
import { FileProperties } from "~/stories/types";
import { TreeProps } from "~/types";
import { TestProvider } from "./TestProvider";

const { OpeningAndClosingAllNodesStory } = composeStories(stories);

describe("Opening and closing all nodes", () => {
  const renderStory = (options: Partial<TreeProps<FileProperties>> = {}) =>
    render(
      <TestProvider>
        <OpeningAndClosingAllNodesStory
          {...OpeningAndClosingAllNodesStory.args}
          {...options}
        />
      </TestProvider>
    );

  test("Opening and closing all nodes", async () => {
    renderStory();

    expect(screen.queryByText("File 1-2")).toBeNull();

    const btnOpenAll = await screen.findByTestId("btn-open-all");
    const btnCloseAll = await screen.findByTestId("btn-close-all");

    fireEvent.click(btnOpenAll);

    expect(await screen.findByText("File 1-2")).toBeInTheDocument();
    expect(await screen.findByText("File 2-1-1")).toBeInTheDocument();

    fireEvent.click(btnCloseAll);

    expect(screen.queryByText("File 1-2")).toBeNull();
    expect(screen.queryByText("File 2-1-1")).toBeNull();
  });
});
