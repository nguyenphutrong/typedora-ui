import { Code2, Gauge, Puzzle, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { easeOutExpo } from "./motion";

const features = [
  {
    icon: Sparkles,
    title: "Full Type Inference",
    description:
      "TypeScript automatically infers types from your options array. No manual type annotations needed.",
  },
  {
    icon: Gauge,
    title: "Zero Runtime Cost",
    description:
      "All type checking happens at compile time. No extra bundle size or performance overhead.",
  },
  {
    icon: Puzzle,
    title: "shadcn/ui Compatible",
    description:
      "Drop-in replacements that work seamlessly with your existing shadcn/ui setup.",
  },
  {
    icon: Code2,
    title: "Copy & Own",
    description:
      "No dependencies to worry about. Copy the source code and customize it to your needs.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOutExpo,
    },
  },
};

export function FeatureCards() {
  return (
    <section className="section border-t border-border bg-muted/30">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mb-12 text-center"
        >
          <h2 className="text-title mb-4">Why Type-Safe Components?</h2>
          <p className="text-body-large mx-auto max-w-2xl text-muted-foreground">
            Stop fighting with TypeScript and let it work for you.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
