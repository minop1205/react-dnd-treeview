import React, { useState } from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { StoryDocumentProps } from "./types";

export const CodeViewer: React.VFC<StoryDocumentProps> = (props) => {
  const [lang, setLang] = useState<"js" | "ts">("js");

  const styles = {
    width: "100%",
    height: "500px",
    border: 0,
    borderRadius: "4px",
    overflow: "hidden",
  };

  const handleChangeLang = (value) => {
    setLang(value);
  };

  return (
    <>
      <ToggleButtonGroup
        value={lang}
        exclusive
        onChange={handleChangeLang}
        aria-label="language"
      >
        <ToggleButton value="js" aria-label="JavaScript">
          JavaScript
        </ToggleButton>
        <ToggleButton value="ts" aria-label="TypeScript">
          TypeScript
        </ToggleButton>
      </ToggleButtonGroup>
      <iframe
        src="https://codesandbox.io/embed/iframe-test-1hxxl?fontsize=14&hidenavigation=1&theme=light&view=editor"
        style={styles}
        title="iframe test"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    </>
  );
};
