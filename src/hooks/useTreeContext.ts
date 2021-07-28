import { useContext } from "react";
import { TreeContext } from "../providers";
import { TreeState } from "../types";

export const useTreeContext = <T>(): TreeState<T> => {
  const treeContext = useContext<TreeState<T>>(TreeContext);

  if (!treeContext) {
    throw new Error("useTreeContext must be used under TreeProvider");
  }

  return treeContext;
};
