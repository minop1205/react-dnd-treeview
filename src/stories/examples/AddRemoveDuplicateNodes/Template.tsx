import React, { useState } from "react";
import { Story } from "@storybook/react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Tree } from "~/Tree";
import { getDescendants } from "~/utils";
import { TreeProps, NodeModel, DropOptions } from "~/types";
import { FileProperties } from "~/stories/types";
import { CustomNode } from "./CustomNode";
import { AddDialog } from "./AddDialog";
import styles from "./AddRemoveDuplicateNodes.module.css";

const getLastId = (treeData: NodeModel[]) => {
  const reversedArray = [...treeData].sort((a, b) => {
    if (a.id < b.id) {
      return 1;
    } else if (a.id > b.id) {
      return -1;
    }

    return 0;
  });

  if (reversedArray.length > 0) {
    return reversedArray[0].id as number;
  }

  return 0;
};

export const Template: Story<TreeProps<FileProperties>> = (args) => {
  const [tree, setTree] = useState<NodeModel<FileProperties>[]>(args.tree);
  const [open, setOpen] = useState<boolean>(false);
  const handleDrop = (
    newTree: NodeModel<FileProperties>[],
    options: DropOptions<FileProperties>
  ) => {
    args.onDrop(newTree, options);
    setTree(newTree);
  };

  const handleDelete = (id: NodeModel["id"]) => {
    const deleteIds = [id, ...getDescendants(tree, id).map((node) => node.id)];
    const newTree = tree.filter((node) => !deleteIds.includes(node.id));
    setTree(newTree);
  };

  const handleCopy = (id: NodeModel["id"]) => {
    const lastId = getLastId(tree);
    const targetNode = tree.find((n) => n.id === id);
    const descendants = getDescendants(tree, id);
    const partialTree = descendants.map((node: NodeModel<FileProperties>) => ({
      ...node,
      id: (node.id as number) + lastId,
      parent: (node.parent as number) + lastId,
    }));

    if (!targetNode) {
      return;
    }

    setTree([
      ...tree,
      {
        ...targetNode,
        id: (targetNode.id as number) + lastId,
      },
      ...partialTree,
    ]);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSubmit = (newNode: Omit<NodeModel<FileProperties>, "id">) => {
    const lastId = getLastId(tree) + 1;

    setTree([
      ...tree,
      {
        ...newNode,
        id: lastId,
      },
    ]);

    setOpen(false);
  };

  return (
    <div className={styles.app}>
      <div className={styles.buttonWrapper}>
        <Button
          onClick={handleOpenDialog}
          startIcon={<AddIcon />}
          data-testid="btn-add"
        >
          Add Node
        </Button>
        {open && (
          <AddDialog
            tree={tree}
            onClose={handleCloseDialog}
            onSubmit={handleSubmit}
          />
        )}
      </div>
      <Tree
        {...args}
        tree={tree}
        render={(node, options) => (
          <CustomNode
            node={node}
            {...options}
            onDelete={handleDelete}
            onCopy={handleCopy}
          />
        )}
        onDrop={handleDrop}
      />
    </div>
  );
};
