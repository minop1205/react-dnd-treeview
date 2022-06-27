import React, { useState } from "react";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Story } from "@storybook/react";
import { DndProvider, MultiBackend, getBackendOptions, Tree } from "~/index";
import { useDropHandler } from "~/stories/useDropHandler";
import { ExternalNode } from "./ExternalNode";
import externalNodesJson from "~/stories/assets/external-nodes.json";
import styles from "./DropElementFromOutsideDndProvider.module.css";
import type { FileProperties } from "~/stories/types";
import type { TreeProps, NodeModel, DropOptions } from "~/types";
import type { Identifier } from "dnd-core";

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
    setLastId((state) => state + 1);
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

  const dropItemTransformer = (
    itemType: Identifier | null,
    dropItem: any,
    dropTargetId: NodeModel["id"]
  ) => {
    if (itemType === "__NATIVE_FILE__") {
      const file = dropItem.files[0] as File;

      return {
        id: lastId,
        parent: dropTargetId,
        text: file.name,
        data: {
          fileSize: `${dropItem.files[0].size / 1024}KB`,
          fileType: "image",
        },
      };
    } else if (itemType === "__NATIVE_TEXT__") {
      return JSON.parse(dropItem.text) as NodeModel<FileProperties>;
    }

    return dropItem as NodeModel<FileProperties>;
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
          <Tree
            {...args}
            tree={tree}
            onDrop={handleDrop}
            dropItemTransformer={dropItemTransformer}
          />
        </DndProvider>
      </div>
    </div>
  );
};
