import { NodeModel } from "~/types";

export const isNodeModel = <T>(arg: any): arg is NodeModel<T> => {
  return (
    arg.id !== undefined && arg.parent !== undefined && arg.text !== undefined
  );
};
