import React, { useState } from "react";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Story } from "@storybook/react";
import { DndProvider, MultiBackend, getBackendOptions, Tree } from "~/index";
import { TreeProps, NodeModel } from "~/types";
import { useDropHandler } from "~/stories/useDropHandler";
import { FileProperties } from "~/stories/types";
import externalNodesJson from "~/stories/assets/external-nodes.json";
import { ExternalNode } from "./ExternalNode";
import { DragLayer } from "./DragLayer";
import styles from "./DropElementFromOutsideTreeview.module.css";

export const Template: Story<TreeProps<FileProperties>> = (args) => {
  const [tree, handleDrop] = useDropHandler<FileProperties>(args);
  const [externalNodes, setExternalNodes] =
    useState<NodeModel<FileProperties>[]>(externalNodesJson);
  const [lastId, setLastId] = useState(105);

  const handleAddExternalNode = () => {
    const node: NodeModel<FileProperties> = {
      id: lastId,
      parent: 0,
      text: `External node ${lastId - 100}`,
      data: {
        fileType: "text",
        fileSize: "1KB",
      },
    };

    setExternalNodes([...externalNodes, node]);
    setLastId(lastId + 1);
  };

  return (
    <DndProvider
      backend={MultiBackend}
      options={getBackendOptions()}
      debugMode={true}
    >
      <DragLayer />
      <div className={styles.rootGrid}>
        <div className={styles.externalContainer}>
          <div>
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={handleAddExternalNode}
            >
              Add node
            </Button>
          </div>
          <div>
            {externalNodes.map((node) => (
              <ExternalNode node={node} />
            ))}
          </div>
        </div>
        <div className={styles.treeContainer}>
          <Tree {...args} tree={tree} onDrop={handleDrop} />
        </div>
      </div>
    </DndProvider>
  );
};
