"use client";

import { ArrowRight, List, Plus, ToggleRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

const components = [
  {
    name: "TypedSelect",
    description: "Type-safe select with grouped options and custom rendering.",
    icon: List,
    href: "/docs/components/typed-select",
    features: ["Full inference", "Grouped options", "Custom render"],
  },
  {
    name: "TypedRadioGroup",
    description: "Headless radio group with render props for complete control.",
    icon: ToggleRight,
    href: "/docs/components/typed-radio-group",
    features: ["Render props", "Headless design", "Accessible"],
  },
];

const upcomingComponents = [
  "TypedCombobox",
  "TypedCheckboxGroup",
  "TypedTabs",
  "TypedToggleGroup",
];

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
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

export function ComponentShowcase() {
  return (
    <section className="section">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mb-12 text-center"
        >
          <h2 className="text-title mb-4">Available Components</h2>
          <p className="text-body-large mx-auto max-w-2xl text-muted-foreground">
            Production-ready components with complete TypeScript support.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {components.map((component) => (
            <motion.div key={component.name} variants={itemVariants}>
              <Link
                href={component.href}
                className="group relative block h-full overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Icon */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <component.icon className="h-7 w-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="mb-2 text-xl font-semibold">{component.name}</h3>
                <p className="mb-6 text-muted-foreground">
                  {component.description}
                </p>

                {/* Features */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {component.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  View Documentation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Coming Soon Card */}
          <motion.div variants={itemVariants}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-dashed border-border bg-muted/30 p-8">
              {/* Icon */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-dashed border-border bg-background">
                <Plus className="h-7 w-7 text-muted-foreground" />
              </div>

              {/* Content */}
              <h3 className="mb-2 text-xl font-semibold text-muted-foreground">
                And More Coming...
              </h3>
              <p className="mb-6 text-muted-foreground">
                We're building more type-safe components for your projects.
              </p>

              {/* Upcoming Components */}
              <div className="mb-6 flex flex-wrap gap-2">
                {upcomingComponents.map((name) => (
                  <span
                    key={name}
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {name}
                  </span>
                ))}
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Status */}
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                In Development
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
