import { useState } from "react";
import { useArgs } from "@storybook/client-api";
import { NodeModel, TreeProps, DropHandlerOptions } from "../types";

// NOTE:
// `useArgs` can't be called in test environment.
// Therefor, use `useState` instead of `useArgs` in test environment.
export const useDropHandler = <T>(
  args: TreeProps<T>
): [
  NodeModel<T>[],
  (newTree: NodeModel<T>[], options: DropHandlerOptions<T>) => void
] => {
  if (process.env.NODE_ENV === "test") {
    const [tree, setTree] = useState(args.tree);
    const handleDrop = (
      newTree: NodeModel<T>[],
      options: DropHandlerOptions<T>
    ) => {
      args.onDrop(newTree, options);
      setTree(newTree);
    };

    return [tree, handleDrop];
  } else {
    const [, updateArgs] = useArgs();
    const handleDrop = (
      newTtree: NodeModel<T>[],
      options: DropHandlerOptions<T>
    ) => {
      args.onDrop(newTtree, options);
      updateArgs({ tree: newTtree });
    };

    return [args.tree, handleDrop];
  }
};
