"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(true);

  // Motion values for the small dot (follows instantly)
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Motion values for the ring (springs)
  const ringX = useSpring(dotX, { stiffness: 300, damping: 20 });
  const ringY = useSpring(dotY, { stiffness: 300, damping: 20 });

  useEffect(() => {
    // Check if it's a touch device
    const checkIsTouchDevice = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0
      );
    };
    
    if (checkIsTouchDevice() || window.innerWidth < 768) {
      setIsDesktop(false);
      return;
    }

    const mouseMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, [dotX, dotY]);

  if (!isDesktop) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#c9a84c] rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[#c9a84c] rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
