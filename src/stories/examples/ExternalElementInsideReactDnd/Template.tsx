import React, { useState } from "react";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Story } from "@storybook/react";
import { Tree } from "~/index";
import { TreeProps, NodeModel, DropOptions } from "~/types";
import { useDropHandler } from "~/stories/useDropHandler";
import { FileProperties } from "~/stories/types";
import externalNodesJson from "~/stories/assets/external-nodes.json";
import { ExternalNode } from "./ExternalNode";
import { DragLayer } from "./DragLayer";
import styles from "./ExternalElementInsideReactDnd.module.css";

export const Template: Story<TreeProps<FileProperties>> = (args) => {
  const [tree, updateTree] = useDropHandler<FileProperties>(args);
  const [externalNodes, setExternalNodes] =
    useState<NodeModel<FileProperties>[]>(externalNodesJson);
  const [lastId, setLastId] = useState(105);

  const handleDrop = (
    newTree: NodeModel<FileProperties>[],
    options: DropOptions<FileProperties>
  ) => {
    const { dragSourceId } = options;

    updateTree(newTree, options);
    setExternalNodes(
      externalNodes.filter((exnode) => exnode.id !== dragSourceId)
    );
  };

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
    <>
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
              <ExternalNode key={node.id} node={node} />
            ))}
          </div>
        </div>
        <div>
          <Tree {...args} tree={tree} onDrop={handleDrop} />
        </div>
      </div>
    </>
  );
};
