import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { composeStories } from "@storybook/testing-react";
import * as stories from "~/stories/examples/InitializeWithOpenParents/InitializeWithOpenParents.stories";
import { FileProperties } from "~/stories/types";
import { TreeProps } from "~/types";
import { TestProvider } from "./TestProvider";

const { InitializeWithOpenParentsStory } = composeStories(stories);

describe("Initialize with open parents", () => {
  const renderStory = (options: Partial<TreeProps<FileProperties>> = {}) =>
    render(
      <TestProvider>
        <InitializeWithOpenParentsStory
          {...InitializeWithOpenParentsStory.args}
          {...options}
        />
      </TestProvider>
    );

  test("open all parent nodes on component initializing", () => {
    renderStory();

    expect(screen.getByText("File 1-1")).toBeInTheDocument();
    expect(screen.getByText("File 1-2")).toBeInTheDocument();
    expect(screen.getByText("Folder 2-1")).toBeInTheDocument();
    expect(screen.getByText("File 2-1-1")).toBeInTheDocument();
  });

  test("open specific parent nodes on component initializing", () => {
    renderStory({ initialOpen: [1, 5] });

    expect(screen.getByText("File 1-1")).toBeInTheDocument();
    expect(screen.getByText("File 1-2")).toBeInTheDocument();
    expect(screen.queryByText("Folder 2-1")).toBeNull();
    expect(screen.queryByText("File 2-1-1")).toBeNull();
  });
});
