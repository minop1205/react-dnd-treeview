import React from "react";
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from "@storybook/addon-docs";
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
        <ArgsTable story={PRIMARY_STORY} />
        <Stories />
      </>
    );
  };
};
