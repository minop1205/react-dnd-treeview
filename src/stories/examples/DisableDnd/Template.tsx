import React, { useState } from "react";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";
import { Tree } from "~/Tree";
import { useDropHandler } from "~/stories/useDropHandler";
import styles from "./DisableDnd.module.css";
import type { StoryFn } from "@storybook/react";
import type { FileProperties } from "~/stories/types";
import type { TreeProps } from "~/types";

export const Template: StoryFn<TreeProps<FileProperties>> = (args) => {
  const [tree, handleDrop] = useDropHandler<FileProperties>(args);
  const [enableDnd, setEnableDnd] = useState(true);

  const handleClickSwitch = () => {
    setEnableDnd((prevState) => !prevState);
  };

  return (
    <div className={styles.app}>
      <div className={styles.switchContainer}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={enableDnd}
                onChange={handleClickSwitch}
                data-testid="switch-dnd"
              />
            }
            label={`Dnd is ${enableDnd ? "enabled" : "disabled"}`}
          />
        </FormGroup>
      </div>
      <Tree
        {...args}
        tree={tree}
        onDrop={handleDrop}
        canDrag={() => enableDnd}
        canDrop={() => {
          if (!enableDnd) {
            return false;
          }
        }}
      />
    </div>
  );
};
