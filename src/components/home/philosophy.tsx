"use client";

import { BookOpen, Code2, Copy, Layers } from "lucide-react";
import { motion } from "motion/react";

const principles = [
  {
    icon: Layers,
    title: "Type-Safety First",
    description: "Every component provides full TypeScript inference",
  },
  {
    icon: Code2,
    title: "Headless by Design",
    description: "Use render props for complete control over rendering",
  },
  {
    icon: BookOpen,
    title: "shadcn Compatible",
    description: "Drop-in replacements that work with your existing setup",
  },
  {
    icon: Copy,
    title: "Zero Lock-in",
    description: "Copy the source code, own your components",
  },
];

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOutExpo,
    },
  },
};

export function Philosophy() {
  return (
    <section className="section border-t border-border bg-muted/30">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mb-12 text-center"
        >
          <h2 className="text-title mb-4">Our Philosophy</h2>
          <p className="text-body-large mx-auto max-w-2xl text-muted-foreground">
            Built with principles that put developers first.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              variants={itemVariants}
              className="flex items-start gap-4 rounded-xl border border-border bg-card p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <principle.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-semibold">{principle.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {principle.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
