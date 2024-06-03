import React from "react";
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
} from "@storybook/blocks";
import { CodeViewer } from "./CodeViewer";
import { StoryDocumentProps } from "./types";

export const pageFactory = (props: StoryDocumentProps) => {
  return function getPageComponents() {
    return (
      <>
        <Title />
        <Subtitle />
        <Description />
        <Primary />
        <CodeViewer {...props} />
        <Controls />
      </>
    );
  };
};
