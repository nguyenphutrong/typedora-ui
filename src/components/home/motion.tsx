"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

// Shared easing curve for consistent Apple-like feel
export const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Reusable animation variants
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
};

// Animated section wrapper with viewport detection
interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: easeOutExpo, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Re-export motion for direct use
export { motion };
