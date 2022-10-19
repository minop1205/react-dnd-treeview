import React, { useState } from "react";
import { Story } from "@storybook/react";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";
import { Tree } from "~/Tree";
import { TreeProps } from "~/types";
import { useDropHandler } from "~/stories/useDropHandler";
import { FileProperties } from "~/stories/types";
import styles from "./DisableDnd.module.css";

export const Template: Story<TreeProps<FileProperties>> = (args) => {
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
