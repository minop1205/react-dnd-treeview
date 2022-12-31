import { useEffect } from "react";
import { ResizeObserver } from "@juggle/resize-observer";
import type { Target, Tween } from "framer-motion";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";
import React, { useState } from "react";

interface AnimateHeightProps {
  isVisible: boolean;
  ease?: Tween["ease"];
  duration?: number;
  variants?: {
    open: Target;
    close: Target;
  };
  children: React.ReactNode;
}

export function AnimateHeight(props: AnimateHeightProps) {
  const {
    isVisible,
    ease = "easeIn",
    duration,
    variants = {
      open: { opacity: 1, height: "auto" },
      close: { opacity: 0, height: 0 },
    },
    children,
  } = props;

  const [ref, { height }] = useMeasure({ polyfill: ResizeObserver });
  const [isVisibleChildren, setIsVisibleChildren] = useState(isVisible);
  const [isVisibleContainer, setIsVisibleContainer] = useState(isVisible);
  const [transition, setTransition] = useState(false);

  const onAnimationComplete = () => {
    setTransition(false);

    if (!isVisible) {
      setIsVisibleChildren(false);
    }
  };

  useEffect(() => {
    setTransition(true);

    if (isVisible) {
      setIsVisibleChildren(true);
    } else {
      setIsVisibleContainer(false);
    }
  }, [isVisible]);

  useEffect(() => {
    if (isVisibleChildren) {
      setIsVisibleContainer(true);
    }
  }, [height]);

  return (
    <motion.div
      style={transition ? { overflow: "hidden" } : undefined}
      onAnimationComplete={onAnimationComplete}
      initial={isVisibleContainer ? "open" : "close"}
      animate={isVisibleContainer ? "open" : "close"}
      inherit={false}
      variants={variants}
      transition={{ ease, duration: computeDuration(height, duration) }}
    >
      <div ref={ref}>{isVisibleChildren && children}</div>
    </motion.div>
  );
}

function computeDuration(height: number, fixedDuration?: number) {
  if (fixedDuration) {
    return fixedDuration;
  }

  if (!height) {
    return 0;
  }

  const constant = height / 36;
  // ??? don't know why use below computed expression (just copy it from somewhere)
  return Math.round((4 + 10 * constant ** 0.25 + constant / 5) * 10) / 1500;
}
