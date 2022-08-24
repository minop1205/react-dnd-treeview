import React, {
  useState,
  ReactElement,
  createContext,
  PropsWithChildren,
} from "react";
import { NativeTypes } from "react-dnd-html5-backend";
import type { NodeModel, TreeProps, DropOptions } from "~/types";
import { FileProperties } from "~/stories/types";
import { useDropHandler } from "~/stories/useDropHandler";
import externalNodesJson from "~/stories/assets/external-nodes.json";

type Props = PropsWithChildren<TreeProps<FileProperties>>;

export type StoryState = {
  tree: NodeModel<FileProperties>[];
  externalNodes: NodeModel<FileProperties>[];
  lastId: number;
  handleDrop: (
    newTree: NodeModel<FileProperties>[],
    options: DropOptions<FileProperties>
  ) => void;
  handleAddExternalNode: () => void;
};

export const StoryContext = createContext({});

export const StoryProvider = (props: Props): ReactElement => {
  const [tree, updateTree] = useDropHandler<FileProperties>(props);
  const [externalNodes, setExternalNodes] =
    useState<NodeModel<FileProperties>[]>(externalNodesJson);
  const [lastId, setLastId] = useState(105);

  const handleDrop: StoryState["handleDrop"] = (newTree, options) => {
    const { dropTargetId, monitor } = options;
    const itemType = monitor.getItemType();

    if (itemType === NativeTypes.TEXT) {
      const nodeJson = monitor.getItem().text;
      const node = JSON.parse(nodeJson) as NodeModel<FileProperties>;

      node.parent = dropTargetId;
      updateTree([...newTree, node], options);
      setExternalNodes(externalNodes.filter((exnode) => exnode.id !== node.id));
      return;
    }

    updateTree(newTree, options);
  };

  const handleAddExternalNode: StoryState["handleAddExternalNode"] = () => {
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

  const value: StoryState = {
    tree,
    externalNodes,
    lastId,
    handleDrop,
    handleAddExternalNode,
  };

  return (
    <StoryContext.Provider value={value}>
      {props.children}
    </StoryContext.Provider>
  );
};
