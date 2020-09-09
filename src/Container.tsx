import React, { useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import { Node } from "./Node";
import { NodeModel } from "./types";
import { useDropContainer } from "./hooks";
import { compareItems } from "./utils";
import { Context } from "./Tree";

const useStyles = makeStyles({
  root: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  hover: {
    background: "#fee",
  },
  filled: {
    boxSizing: "border-box",
    minHeight: "100%",
    paddingBlockEnd: 30,
  },
});

type Props = {
  parentId: NodeModel["id"];
  depth: number;
};

export const Container: React.FC<Props> = (props) => {
  const classes = useStyles();
  const context = useContext(Context);
  const nodes = context.tree.filter((l) => l.parent === props.parentId);
  const groups = nodes.filter((n) => n.nodeType === "node").sort(compareItems);
  const templates = nodes
    .filter((n) => n.nodeType === "leaf")
    .sort(compareItems);
  const view = [...groups, ...templates];
  const [isOver, drop] = useDropContainer(context.tree, context.onDrop);

  return (
    <ul
      ref={props.parentId === 0 ? drop : undefined}
      className={`${classes.root} ${isOver ? classes.hover : ""} ${
        props.parentId === 0 ? classes.filled : ""
      }`}
    >
      {view.map((node) => (
        <Node key={node.id} id={node.id} depth={props.depth} />
      ))}
    </ul>
  );
};
