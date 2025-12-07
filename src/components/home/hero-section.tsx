import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { easeOutExpo } from "./motion";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden pt-16">
      {/* Background gradient - stronger in light mode */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent dark:from-primary/8 dark:via-primary/4"
      />

      {/* Decorative circles - stronger in light mode */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/15 blur-[100px] dark:bg-primary/8"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        className="pointer-events-none absolute -right-40 top-20 h-[400px] w-[400px] rounded-full bg-primary/12 blur-[100px] dark:bg-primary/6"
      />

      {/* Bottom fade to blend with next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <div className="container-narrow relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOutExpo, delay: 0 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <span>Type-Safe shadcn/ui Extension</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.1 }}
          className="text-display mb-6"
        >
          <span className="inline-block bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Never guess types
          </span>
          <br />
          <span>again.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.2 }}
          className="text-body-large mx-auto mb-8 max-w-2xl text-muted-foreground"
        >
          Full TypeScript inference for your React components. Drop-in
          replacements for shadcn/ui with zero runtime cost.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.3 }}
          className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            to="/docs/$"
            params={{ _splat: "" }}
            className="group inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 font-medium text-primary-foreground transition-all hover:scale-[1.02] hover:opacity-90 active:scale-[0.98]"
          >
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/docs/$"
            params={{ _splat: "components/typed-select" }}
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-secondary/50 px-6 font-medium transition-all hover:scale-[1.02] hover:bg-secondary active:scale-[0.98]"
          >
            View Components
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
