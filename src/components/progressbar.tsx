"use client";

import { useScroll, motion, useSpring, useTransform } from "framer-motion";

function ProgressBar() {
  // Get the scroll progress
  const { scrollYProgress } = useScroll();

  // Use spring to smooth the scroll progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300, // Increased stiffness for a snappier feel
    damping: 30, // Damping to reduce oscillation
  });

  // Transform the background color based on scroll progress
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
        transformOrigin: "left", // Ensure it grows from the left
      }}
      className="fixed top-0 left-0 w-full h-1 rounded-lg z-50"
    />
  );
}

export default ProgressBar;
    