import React, { useState } from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { JavaScript } from "./icons/JavaScript";
import { TypeScript } from "./icons/TypeScript";
import { StoryDocumentProps } from "./types";

export const CodeViewer: React.VFC<StoryDocumentProps> = (props) => {
  const [id, setId] = useState<string>(props.jsId || props.tsId || "");

  const styles: React.CSSProperties = {
    border: 0,
    borderRadius: "4px",
    height: "500px",
    marginTop: "16px",
    overflow: "hidden",
    width: "100%",
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    value: string
  ) => {
    setId(value);
  };

  return (
    <div>
      {props.jsId && props.tsId && (
        <ToggleButtonGroup
          value={id}
          onChange={handleChange}
          size="small"
          exclusive
          aria-label="language"
        >
          <ToggleButton value={props.jsId} aria-label="JavaScript">
            <JavaScript />
          </ToggleButton>
          <ToggleButton value={props.tsId} aria-label="TypeScript">
            <TypeScript />
          </ToggleButton>
        </ToggleButtonGroup>
      )}
      {id !== "" && (
        <iframe
          style={styles}
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          src={`https://codesandbox.io/embed/${id}?fontsize=14&hidenavigation=1&theme=dark&view=editor&module=%2Fsrc%2FApp.${
            id === props.jsId ? "jsx" : "tsx"
          }`}
        ></iframe>
      )}
    </div>
  );
};
