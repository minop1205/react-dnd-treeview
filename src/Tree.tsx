import React, { forwardRef } from "react";
import { Container } from "./Container";
import { DragLayer } from "./DragLayer";
import { Providers } from "./providers";
import type { TreeMethods, TreeProps } from "./types";

function TreeInner<T>(
  props: TreeProps<T>,
  ref: React.ForwardedRef<TreeMethods>,
) {
  return (
    <Providers {...props} treeRef={ref}>
      {props.dragPreviewRender && <DragLayer />}
      <Container parentId={props.rootId} depth={0} />
    </Providers>
  );
}

const Tree = forwardRef(TreeInner) as <T = unknown>(
  props: TreeProps<T> & { ref?: React.ForwardedRef<TreeMethods> },
) => ReturnType<typeof TreeInner>;

export { Tree };
