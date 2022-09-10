import React, { useState, useEffect } from "react";
import { Story } from "@storybook/react";
import { Tree } from "~/Tree";
import { isAncestor } from "~/utils";
import {
  TreeProps,
  NodeModel,
  DropOptions,
  DragLayerMonitorProps,
} from "~/types";
import { useDropHandler } from "~/stories/useDropHandler";
import { FileProperties } from "~/stories/types";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import { CustomNode } from "./CustomNode";
import { MultipleDragPreview } from "./MultipleDragPreview";

export const Template: Story<TreeProps<FileProperties>> = (args) => {
  const [selectedNodes, setSelectedNodes] = useState<
    NodeModel<FileProperties>[]
  >([]);
  const [tree, setTree] = useDropHandler<FileProperties>(args);
  const [isDragging, setIsDragging] = useState(false);
  const [isCtrlPressing, setIsCtrlPressing] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "escape") {
        setSelectedNodes([]);
      } else if (e.ctrlKey || e.metaKey) {
        setIsCtrlPressing(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "control" || e.key.toLowerCase() === "meta") {
        setIsCtrlPressing(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  });

  const handleSingleSelect = (node: NodeModel<FileProperties>) => {
    setSelectedNodes([node]);
  };

  const handleMultiSelect = (clickedNode: NodeModel<FileProperties>) => {
    const selectedIds = selectedNodes.map((n) => n.id);

    // ignore if the clicked node is already selected
    if (selectedIds.includes(clickedNode.id)) {
      return;
    }

    // ignore if ancestor node already selected
    if (
      selectedIds.some((selectedId) =>
        isAncestor(tree, selectedId, clickedNode.id)
      )
    ) {
      return;
    }

    let updateNodes = [...selectedNodes];

    // if descendant nodes already selected, remove them
    updateNodes = updateNodes.filter((selectedNode) => {
      return !isAncestor(tree, clickedNode.id, selectedNode.id);
    });

    updateNodes = [...updateNodes, clickedNode];
    setSelectedNodes(updateNodes);
  };

  const handleClick = (
    e: React.MouseEvent,
    node: NodeModel<FileProperties>
  ) => {
    if (e.ctrlKey || e.metaKey) {
      handleMultiSelect(node);
    } else {
      handleSingleSelect(node);
    }
  };

  const handleDragStart = (node: NodeModel<FileProperties>) => {
    const isSelectedNode = selectedNodes.some((n) => n.id === node.id);
    setIsDragging(true);

    if (!isCtrlPressing && isSelectedNode) {
      return;
    }

    if (!isCtrlPressing) {
      setSelectedNodes([node]);
      return;
    }

    if (!selectedNodes.some((n) => n.id === node.id)) {
      setSelectedNodes([...selectedNodes, node]);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setIsCtrlPressing(false);
    setSelectedNodes([]);
  };

  const handleDrop = (
    newTree: NodeModel<FileProperties>[],
    options: DropOptions<FileProperties>
  ) => {
    console.log(options);

    const { dropTargetId } = options;

    setTree(
      newTree.map((node) => {
        if (selectedNodes.some((selectedNode) => selectedNode.id === node.id)) {
          return {
            ...node,
            parent: dropTargetId,
          };
        }

        return node;
      }),
      options
    );

    setSelectedNodes([]);
  };

  return (
    <Tree
      {...args}
      tree={tree}
      onDrop={handleDrop}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      canDrop={(tree, options) => {
        if (
          selectedNodes.some(
            (selectedNode) => selectedNode.id === options.dropTargetId
          )
        ) {
          return false;
        }
      }}
      render={(node, options) => {
        const selected = selectedNodes.some(
          (selectedNode) => selectedNode.id === node.id
        );

        return (
          <CustomNode
            node={node}
            {...options}
            isSelected={selected}
            isDragging={selected && isDragging}
            onClick={handleClick}
          />
        );
      }}
      dragPreviewRender={(
        monitorProps: DragLayerMonitorProps<FileProperties>
      ) => {
        if (selectedNodes.length > 1) {
          return <MultipleDragPreview dragSources={selectedNodes} />;
        }

        return <CustomDragPreview monitorProps={monitorProps} />;
      }}
    />
  );
};
