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
  childrenCount: number;
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
    childrenCount,
  } = props;
  const [ref, { height }] = useMeasure({ polyfill: ResizeObserver });
  const [animating, setAnimating] = useState(false);

  const [visible, setVisible] = useState(isVisible);
  const [visibleChildren, setVisibleChildren] = useState(isVisible);

  const onAnimationStart = () => {
    setAnimating(true);
  };

  const onAnimationComplete = () => {
    setAnimating(false);

    if (!visible) {
      setVisibleChildren(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      setVisible(true);
      setVisibleChildren(true);
    } else {
      setVisible(false);
    }
  }, [isVisible]);

  return (
    <motion.div
      style={visible && !animating ? undefined : { overflow: "hidden" }}
      onAnimationComplete={onAnimationComplete}
      onAnimationStart={onAnimationStart}
      initial={visible ? "open" : "close"}
      animate={visible ? "open" : "close"}
      inherit={false}
      variants={variants}
      transition={{
        ease,
        duration: computeDuration(childrenCount, duration),
      }}
    >
      <div ref={ref}>{visibleChildren && children}</div>
    </motion.div>
  );
}

// Auto compute the duration by children count
function computeDuration(childrenCount: number, fixedDuration?: number) {
  if (fixedDuration) {
    return fixedDuration;
  }

  if (childrenCount === 0) {
    return 0;
  }

  const constant = (childrenCount * 30) / 36;
  // ??? don't know why use below computed expression (just copy it from somewhere)
  return Math.round((4 + 10 * constant ** 0.25 + constant / 5) * 10) / 1500;
}
