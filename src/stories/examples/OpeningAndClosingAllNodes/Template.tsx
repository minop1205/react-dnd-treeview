import React, { useRef } from "react";
import { Story } from "@storybook/react";
import Button from "@mui/material/Button";
import { Tree } from "~/Tree";
import { TreeProps, NodeModel, TreeMethods } from "~/types";
import { useDropHandler } from "~/stories/useDropHandler";
import { FileProperties } from "~/stories/types";
import { CustomNode } from "~/stories/examples/components/CustomNode";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import styles from "./OpeningAndClosingAllNodes.module.css";

export const Template: Story<TreeProps<FileProperties>> = (args) => {
  const [tree, handleDrop] = useDropHandler<FileProperties>(args);
  const ref = useRef<TreeMethods>(null);
  const handleOpenAll = () => ref.current?.openAll();
  const handleCloseAll = () => ref.current?.closeAll();

  return (
    <>
      <div className={styles.actions}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleOpenAll}
          data-testid="btn-open-all"
        >
          Open All
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleCloseAll}
          data-testid="btn-close-all"
        >
          Close All
        </Button>
      </div>
      <Tree
        ref={ref}
        {...args}
        tree={tree}
        onDrop={handleDrop}
        render={(
          node: NodeModel<FileProperties>,
          { depth, isOpen, onToggle }
        ) => (
          <CustomNode
            node={node}
            depth={depth}
            isOpen={isOpen}
            onToggle={onToggle}
          />
        )}
        dragPreviewRender={(monitorProps) => (
          <CustomDragPreview monitorProps={monitorProps} />
        )}
      />
    </>
  );
};
