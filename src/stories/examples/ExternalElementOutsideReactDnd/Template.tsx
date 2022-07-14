import React, { useState } from "react";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Story } from "@storybook/react";
import { DndProvider, MultiBackend, getBackendOptions, Tree } from "~/index";
import { useDropHandler } from "~/stories/useDropHandler";
import { ExternalNode } from "./ExternalNode";
import externalNodesJson from "~/stories/assets/external-nodes.json";
import styles from "./ExternalElementOutsideReactDnd.module.css";
import { NativeTypes } from "react-dnd-html5-backend";
import type { FileProperties } from "~/stories/types";
import type { TreeProps, NodeModel, DropOptions } from "~/types";

export const Template: Story<TreeProps<FileProperties>> = (args) => {
  const [tree, updateTree] = useDropHandler<FileProperties>(args);
  const [externalNodes, setExternalNodes] =
    useState<NodeModel<FileProperties>[]>(externalNodesJson);
  const [lastId, setLastId] = useState(105);

  const handleDrop = (
    newTree: NodeModel<FileProperties>[],
    options: DropOptions<FileProperties>
  ) => {
    const { dropTargetId, monitor } = options;
    const itemType = monitor.getItemType();

    if (itemType === NativeTypes.TEXT) {
      const nodeJson = monitor.getItem().text;
      const node = JSON.parse(nodeJson) as NodeModel<FileProperties>;

      node.parent = dropTargetId;
      updateTree([...newTree, node], options);
      setExternalNodes(externalNodes.filter((exnode) => exnode.id !== node.id));
      setLastId((state) => state + 1);
      return;
    }

    updateTree(newTree, options);
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
    setLastId((state) => state + 1);
  };

  return (
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
        <DndProvider
          backend={MultiBackend}
          options={getBackendOptions()}
          debugMode={true}
        >
          <Tree {...args} tree={tree} onDrop={handleDrop} />
        </DndProvider>
      </div>
    </div>
  );
};
