"use client";

import { useScroll, motion, useSpring, useTransform } from "framer-motion";

function ProgressBar() {

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300, // Increased stiffness for a snappier feel
    damping: 30, // Damping to reduce oscillation
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#ed1c24", "#fe1c24"]
  );

  return (
    <motion.div
      style={{
        scaleX,
        background: backgroundColor,
        transformOrigin: "left",
      }}
      className="fixed top-0 left-0 w-full h-1 rounded-lg z-50"
    />
  );
}

export default ProgressBar;
    