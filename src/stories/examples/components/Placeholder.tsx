import React from "react";
import { NodeModel } from "~/types";
import styles from "./Placeholder.module.css";

type Props = {
  node: NodeModel;
  depth: number;
};

export const Placeholder: React.FC<Props> = (props) => (
  <div
    className={styles.root}
    style={{ left: props.depth * 24 }}
    data-testid="placeholder"
  ></div>
);
