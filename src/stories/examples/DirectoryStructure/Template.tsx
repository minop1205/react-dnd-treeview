import React from "react";
import MultiBackend from "react-dnd-multi-backend";
import { getDescendants, getBackendOptions } from "~/utils";
import { DropOptions, NodeModel, TreeProps } from "~/types";
import { DndProvider } from "react-dnd-multi-backend";
import { Tree } from "~/Tree";
import Node from "./Node";
import Placeholder from "./CustomPlaceholder";
import useTreeOpenHandler from "./useTreeOpenHandler";
import styles from "./DirectoryStructure.module.css";

import { Story } from "@storybook/react";
import sampleData from "~/stories/assets/sample-default.json";

import { FileProperties } from "~/stories/types";

const reorderArray = (array: NodeModel[], sourceIndex: number, targetIndex: number) => {
  const newArray = [...array];
  const element = newArray.splice(sourceIndex, 1)[0];
  newArray.splice(targetIndex, 0, element);
  return newArray;
};

const Template: Story<TreeProps<FileProperties>> = () => {
  const { ref, getPipeHeight, toggle } = useTreeOpenHandler();
  const [treeData, setTreeData] = React.useState<NodeModel[]>(sampleData);

  const handleDrop = (_newTree: NodeModel[], e: DropOptions) => {
    const { dragSourceId, dropTargetId, destinationIndex } = e;
    if (typeof dragSourceId === "undefined" || typeof dropTargetId === "undefined") return;
    const start = treeData.find((v) => v.id === dragSourceId);
    const end = treeData.find((v) => v.id === dropTargetId);

    if (start?.parent === dropTargetId && start && typeof destinationIndex === "number") {
      setTreeData((treeData) => {
        const output = reorderArray(treeData, treeData.indexOf(start), destinationIndex);
        return output;
      });
    }

    if (start?.parent !== dropTargetId && start && typeof destinationIndex === "number") {
      if (
        getDescendants(treeData, dragSourceId).find((el) => el.id === dropTargetId) ||
        dropTargetId === dragSourceId ||
        (end && !end?.droppable)
      )
        return;
      setTreeData((treeData) => {
        const output = reorderArray(treeData, treeData.indexOf(start), destinationIndex);
        const movedElement = output.find((el) => el.id === dragSourceId);
        if (movedElement) movedElement.parent = dropTargetId;
        return output;
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <Tree
        ref={ref}
        classes={{
          root: styles.treeRoot,
          placeholder: styles.placeholder,
          dropTarget: styles.dropTarget,
          listItem: styles.listItem,
        }}
        tree={treeData}
        sort={false}
        rootId={0}
        insertDroppableFirst={false}
        enableAnimateExpand={true}
        onDrop={handleDrop}
        canDrop={() => true}
        dropTargetOffset={5}
        placeholderRender={(node, { depth }) => <Placeholder node={node} depth={depth} />}
        render={(node, { depth, isOpen, isDropTarget }) => (
          <Node
            getPipeHeight={getPipeHeight}
            node={node}
            depth={depth}
            isOpen={isOpen}
            onClick={() => {
              if (node.droppable) {
                toggle(node?.id);
              }
            }}
            isDropTarget={isDropTarget}
            treeData={treeData}
          />
        )}
      />
    </div>
  );
};

export default Template;
