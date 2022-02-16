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

type Props = {
  tsUrl?: string;
  jsUrl?: string;
};

export const pageFactory = (props: Props) => {
  const styles = {
    width: "100%",
    height: "500px",
    border: 0,
    borderRadius: "4px",
    overflow: "hidden",
  };

  const components = (
    <>
      <Title />
      <Subtitle />
      <Description />
      <Primary />
      <iframe
        src="https://codesandbox.io/embed/iframe-test-1hxxl?fontsize=14&hidenavigation=1&theme=light&view=editor"
        style={styles}
        title="iframe test"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
      <ArgsTable story={PRIMARY_STORY} />
      <Stories />
    </>
  );

  return () => components;
};
