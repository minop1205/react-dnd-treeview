import React from "react";
import { Tree } from "~/Tree";
import { TreeProps } from "~/types";
import { CustomNode } from "~/stories/examples/components/CustomNode";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import styles from "./TreeView.module.css";

type Props<T> = Pick<TreeProps<T>, "tree" | "onDrop" | "rootId">;

export const TreeView: React.FC<Props<any>> = (props) => (
  <Tree
    tree={props.tree}
    onDrop={props.onDrop}
    rootId={props.rootId}
    classes={{
      root: styles.treeRoot,
      draggingSource: styles.draggingSource,
      dropTarget: styles.dropTarget,
    }}
    render={(node, options) => <CustomNode node={node} {...options} />}
    dragPreviewRender={(monitorProps) => (
      <CustomDragPreview monitorProps={monitorProps} />
    )}
  />
);
