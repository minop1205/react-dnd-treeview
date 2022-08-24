import React, { useContext } from "react";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { StoryContext, StoryState } from "./StoryProvider";
import { ExternalNode } from "./ExternalNode";
import styles from "./ExternalElementOutsideReactDnd.module.css";

export const ExternalContainer: React.FC = (props) => {
  const storyContext = useContext(StoryContext) as StoryState;
  const { externalNodes, handleAddExternalNode } = storyContext;

  return (
    <div className={styles.externalContainer}>
      <div>
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={handleAddExternalNode}
        >
          Add node
        </Button>
      </div>
      <div>
        {externalNodes.map((node) => (
          <ExternalNode key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
};
