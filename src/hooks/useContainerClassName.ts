import { NodeModel } from "~/types";
import { useTreeContext } from "./useTreeContext";

export const useContainerClassName = (
  parentId: NodeModel["id"],
  isOver: boolean
): string => {
  const { rootId, rootProps, classes } = useTreeContext();
  let className = classes?.container || "";

  if (isOver && classes?.dropTarget) {
    className = `${className} ${classes.dropTarget}`;
  }

  if (parentId === rootId && classes?.root) {
    className = `${className} ${classes.root}`;
  }

  if (parentId === rootId && rootProps?.className) {
    className = `${className} ${rootProps.className}`;
  }

  className = className.trim();

  return className;
};
