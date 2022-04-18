import { useState } from "react";
//import { useArgs } from "@storybook/client-api";
import { NodeModel, TreeProps, DropOptions } from "~/types";

// NOTE:
// `useArgs` can't be called in test environment.
// Therefor, use `useState` instead of `useArgs` in test environment.
export const useDropHandler = <T>(
  args: TreeProps<T>
): [
  NodeModel<T>[],
  (newTree: NodeModel<T>[], options: DropOptions<T>) => void
] => {
  // Stop using updateArgs.
  // Because if you use it in Docs mode,
  // openIds will be initialized at the time of onDrop.

  // if (process.env.NODE_ENV === "test") {
  //   const [tree, setTree] = useState(args.tree);
  //   const handleDrop = (newTree: NodeModel<T>[], options: DropOptions<T>) => {
  //     args.onDrop(newTree, options);
  //     setTree(newTree);
  //   };

  //   return [tree, handleDrop];
  // } else {
  //   const [, updateArgs] = useArgs();
  //   const handleDrop = (newTtree: NodeModel<T>[], options: DropOptions<T>) => {
  //     args.onDrop(newTtree, options);
  //     updateArgs({ tree: newTtree });
  //   };

  //   return [args.tree, handleDrop];
  // }

  const [tree, setTree] = useState(args.tree);
  const handleDrop = (newTree: NodeModel<T>[], options: DropOptions<T>) => {
    args.onDrop(newTree, options);
    setTree(newTree);
  };

  return [tree, handleDrop];
};
