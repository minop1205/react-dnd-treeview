import React, { forwardRef } from "react";
import { DragLayer } from "./DragLayer";
import { Container } from "./Container";
import { Providers } from "./providers";
import { OpenIdsHandlers, TreeProps } from "./types";

const Tree = forwardRef<OpenIdsHandlers, TreeProps>((props, ref) => (
  <Providers {...props} treeRef={ref}>
    {props.dragPreviewRender && <DragLayer />}
    <Container parentId={props.rootId} depth={0} />
  </Providers>
));

Tree.displayName = "Tree";

export { Tree };
