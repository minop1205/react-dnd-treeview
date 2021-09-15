import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./Tree.stories";

describe("Tree", () => {
  const { MinimumConfigurationStory } = composeStories(stories);

  test("count of node items", () => {
    render(<MinimumConfigurationStory />);
    expect(screen.getAllByRole("listitem").length).toBe(3);
  });
});
