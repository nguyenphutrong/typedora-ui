import { AlertTriangle, Check, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { easeOutExpo } from "./motion";

// Twoslash-style inline type popup (CSS-only, always visible)
function TypePopup({
  children,
  label,
  type,
}: {
  children: React.ReactNode;
  label: string;
  type: string;
}) {
  return (
    <span className="twoslash-hover relative inline">
      <span className="twoslash-target">{children}</span>
      <span className="twoslash-popup absolute left-1/2 top-full z-10 mt-3 block w-max -translate-x-1/2 rounded-xl border border-border bg-fd-popover px-4 py-2 font-mono text-sm shadow-xl">
        <span className="twoslash-arrow absolute -top-[6px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-border bg-fd-popover" />
        <span className="text-purple-400">{label}</span>
        <span className="text-fd-popover-foreground">: </span>
        <span className="text-blue-400">{type}</span>
      </span>
    </span>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export function TypeSafetyDemo() {
  const [selectedFruit, setSelectedFruit] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-5xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: easeOutExpo }}
        className="mb-8 text-center"
      >
        <h2 className="text-title mb-3">The Problem with shadcn/ui Select</h2>
        <p className="text-muted-foreground">
          See why type-safe components make a difference
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid gap-6 lg:grid-cols-2"
      >
        {/* shadcn/ui Select - The Problem */}
        <motion.div
          variants={itemVariants}
          className="relative flex flex-col overflow-hidden rounded-2xl border-2 border-red-500/30 bg-card"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-red-500/5 px-5 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10">
                <X className="h-3.5 w-3.5 text-red-500" />
              </div>
              <span className="font-medium">shadcn/ui Select</span>
            </div>
            <span className="rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-medium text-red-500">
              Type Unsafe
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col space-y-4 p-5">
            {/* Problem 1: String values only */}
            <div className="rounded-xl bg-muted/50 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-medium text-red-500">
                <AlertTriangle className="h-3.5 w-3.5" />
                SelectItem only accepts string values
              </div>
              <pre className="overflow-x-auto font-mono text-xs leading-relaxed">
                <code>
                  <span className="text-muted-foreground">
                    {"// Your data has number IDs\n"}
                  </span>
                  <span className="text-blue-400">const</span>
                  <span className="text-foreground"> users</span>
                  <span className="text-foreground">: </span>
                  <span className="text-yellow-400">Users</span>
                  <span className="text-foreground"> = [</span>
                  {"\n"}
                  <span className="text-foreground">{"  { "}</span>
                  <span className="text-purple-400">id</span>
                  <span className="text-foreground">: </span>
                  <span className="text-orange-400">1</span>
                  <span className="text-foreground">, </span>
                  <span className="text-purple-400">name</span>
                  <span className="text-foreground">: </span>
                  <span className="text-green-400">"Alice"</span>
                  <span className="text-foreground">{" },"}</span>
                  {"\n"}
                  <span className="text-foreground">{"  { "}</span>
                  <span className="text-purple-400">id</span>
                  <span className="text-foreground">: </span>
                  <span className="text-orange-400">2</span>
                  <span className="text-foreground">, </span>
                  <span className="text-purple-400">name</span>
                  <span className="text-foreground">: </span>
                  <span className="text-green-400">"Bob"</span>
                  <span className="text-foreground">{" },"}</span>
                  {"\n"}
                  <span className="text-foreground">];</span>
                </code>
              </pre>
            </div>

            {/* Problem 2: Must convert to string */}
            <div className="rounded-xl bg-muted/50 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-medium text-red-500">
                <AlertTriangle className="h-3.5 w-3.5" />
                Must convert everything to string
              </div>
              <pre className="overflow-x-auto font-mono text-xs leading-relaxed">
                <code>
                  <span className="text-foreground">{"<"}</span>
                  <span className="text-blue-400">SelectItem</span>
                  {"\n"}
                  <span className="text-foreground">{"  "}</span>
                  <span className="text-purple-400">key</span>
                  <span className="text-foreground">=</span>
                  <span className="text-foreground">
                    {"{"}user.id{"}"}
                  </span>
                  {"\n"}
                  <span className="text-foreground">{"  "}</span>
                  <span className="text-purple-400">value</span>
                  <span className="text-foreground">=</span>
                  <span className="text-foreground">
                    {"{"}String(user.id){"}"}
                  </span>
                  <span className="text-muted-foreground">
                    {' // "1", "2"'}
                  </span>
                  {"\n"}
                  <span className="text-foreground">{">"}</span>
                  {"\n"}
                  <span className="text-foreground">
                    {"  "}
                    {"{"}user.name{"}"}
                  </span>
                  {"\n"}
                  <span className="text-foreground">{"</"}</span>
                  <span className="text-blue-400">SelectItem</span>
                  <span className="text-foreground">{">"}</span>
                </code>
              </pre>
            </div>

            {/* Problem 3: onValueChange returns string */}
            <div className="rounded-xl bg-muted/50 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-medium text-red-500">
                <AlertTriangle className="h-3.5 w-3.5" />
                onValueChange always returns string
              </div>
              <pre className="overflow-x-auto font-mono text-xs leading-relaxed">
                <code>
                  <span className="text-purple-400">onValueChange</span>
                  <span className="text-foreground">=</span>
                  <span className="text-foreground">{"{"}(</span>
                  <span className="text-orange-400">value</span>
                  <span className="text-foreground">) ={"> {"}</span>
                  {"\n"}
                  <span className="text-muted-foreground">
                    {"  // value: string - type info lost!\n"}
                  </span>
                  <span className="text-foreground">{"  "}</span>
                  <span className="text-blue-400">const</span>
                  <span className="text-foreground"> userId = </span>
                  <span className="text-yellow-400">Number</span>
                  <span className="text-foreground">(value);</span>
                  {"\n"}
                  <span className="text-muted-foreground">
                    {"  // Could be NaN, no type error!\n"}
                  </span>
                  <span className="text-foreground">{"}}"}</span>
                </code>
              </pre>
            </div>

            {/* Spacer to push summary to bottom */}
            <div className="flex-1" />

            {/* Summary */}
            <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
              <X className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
              <div className="text-sm">
                <div className="mb-1 font-medium text-red-500">
                  Type information completely lost
                </div>
                <div className="text-muted-foreground">
                  Manual string conversion, runtime parsing, potential bugs.
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* TypedSelect - The Solution */}
        <motion.div
          variants={itemVariants}
          className="relative flex flex-col overflow-hidden rounded-2xl border-2 border-green-500/30 bg-card"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-green-500/5 px-5 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10">
                <Check className="h-3.5 w-3.5 text-green-500" />
              </div>
              <span className="font-medium">TypedSelect</span>
            </div>
            <span className="rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-500">
              Type Safe
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col space-y-4 p-5">
            {/* Solution 1: Same data, add as const */}
            <div className="rounded-xl bg-muted/50 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-medium text-green-500">
                <Check className="h-3.5 w-3.5" />
                Use your data directly with valueKey/labelKey
              </div>
              <pre className="overflow-x-auto font-mono text-xs leading-relaxed">
                <code>
                  <span className="text-muted-foreground">
                    {"// Same data structure\n"}
                  </span>
                  <span className="text-blue-400">const</span>
                  <span className="text-foreground"> users</span>
                  <span className="text-foreground">: </span>
                  <span className="text-yellow-400">Users</span>
                  <span className="text-foreground"> = [</span>
                  {"\n"}
                  <span className="text-foreground">{"  { "}</span>
                  <span className="text-purple-400">id</span>
                  <span className="text-foreground">: </span>
                  <span className="text-orange-400">1</span>
                  <span className="text-foreground">, </span>
                  <span className="text-purple-400">name</span>
                  <span className="text-foreground">: </span>
                  <span className="text-green-400">"Alice"</span>
                  <span className="text-foreground">{" },"}</span>
                  {"\n"}
                  <span className="text-foreground">{"  { "}</span>
                  <span className="text-purple-400">id</span>
                  <span className="text-foreground">: </span>
                  <span className="text-orange-400">2</span>
                  <span className="text-foreground">, </span>
                  <span className="text-purple-400">name</span>
                  <span className="text-foreground">: </span>
                  <span className="text-green-400">"Bob"</span>
                  <span className="text-foreground">{" },"}</span>
                  {"\n"}
                  <span className="text-foreground">];</span>
                </code>
              </pre>
            </div>

            {/* Solution 2: Simple usage with custom keys */}
            <div className="rounded-xl bg-muted/50 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-medium text-green-500">
                <Check className="h-3.5 w-3.5" />
                No string conversion needed
              </div>
              <pre className="overflow-x-auto font-mono text-xs leading-relaxed">
                <code>
                  <span className="text-foreground">{"<"}</span>
                  <span className="text-blue-400">TypedSelect</span>
                  {"\n"}
                  <span className="text-foreground">{"  "}</span>
                  <span className="text-purple-400">options</span>
                  <span className="text-foreground">=</span>
                  <span className="text-foreground">
                    {"{"}users{"}"}
                  </span>
                  {"\n"}
                  <span className="text-foreground">{"  "}</span>
                  <span className="text-purple-400">valueKey</span>
                  <span className="text-foreground">=</span>
                  <span className="text-green-400">"id"</span>
                  {"\n"}
                  <span className="text-foreground">{"  "}</span>
                  <span className="text-purple-400">labelKey</span>
                  <span className="text-foreground">=</span>
                  <span className="text-green-400">"name"</span>
                  {"\n"}
                  <span className="text-foreground">{"  "}</span>
                  <span className="text-purple-400">onChange</span>
                  <span className="text-foreground">=</span>
                  <span className="text-foreground">
                    {"{"}setUserId{"}"}
                  </span>
                  {"\n"}
                  <span className="text-foreground">{"/>"}</span>
                </code>
              </pre>
            </div>

            {/* Solution 3: Full type inference */}
            <div className="rounded-xl bg-muted/50 p-4 pb-16">
              <div className="mb-2 flex items-center gap-2 text-xs font-medium text-green-500">
                <Check className="h-3.5 w-3.5" />
                onChange receives the exact type
              </div>
              <pre className="font-mono text-xs leading-relaxed">
                <code>
                  <span className="text-purple-400">onChange</span>
                  <span className="text-foreground">=</span>
                  <span className="text-foreground">{"{"}(</span>
                  <TypePopup label="value" type="number">
                    <span className="text-orange-400">value</span>
                  </TypePopup>
                  <span className="text-foreground">) ={"> {"}</span>
                  {"\n"}
                  <span className="text-foreground">{"  "}...</span>
                  {"\n"}
                  <span className="text-foreground">{"}}"}</span>
                </code>
              </pre>
            </div>

            {/* Spacer to push summary to bottom */}
            <div className="flex-1" />

            {/* Summary */}
            <div className="flex items-start gap-3 rounded-xl border border-green-500/20 bg-green-500/5 p-4">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
              <div className="text-sm">
                <div className="mb-1 font-medium text-green-500">
                  Full type inference preserved
                </div>
                <div className="text-muted-foreground">
                  Works with number, boolean, string. Errors caught at compile
                  time.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Interactive Demo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.2 }}
        className="mt-8 rounded-2xl border border-border bg-card p-6"
      >
        <div className="mb-4 text-center">
          <h3 className="mb-1 font-semibold">Try the difference</h3>
          <p className="text-sm text-muted-foreground">
            Select a user ID and see how TypeScript infers the type
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[1, 2, 3].map((id) => (
            <motion.button
              type="button"
              key={id}
              onClick={() => setSelectedFruit(String(id))}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                selectedFruit === String(id)
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              User {id}
            </motion.button>
          ))}
          {selectedFruit && (
            <motion.button
              type="button"
              onClick={() => setSelectedFruit(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Clear
            </motion.button>
          )}
        </div>
        {selectedFruit && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-6"
          >
            <code className="rounded-lg bg-red-500/10 px-3 py-1.5 font-mono text-sm text-red-500">
              shadcn: <span className="opacity-70">"{selectedFruit}"</span>{" "}
              <span className="text-xs opacity-50">(string)</span>
            </code>
            <span className="text-muted-foreground">vs</span>
            <code className="rounded-lg bg-green-500/10 px-3 py-1.5 font-mono text-sm text-green-500">
              Typedora: <span className="opacity-90">{selectedFruit}</span>{" "}
              <span className="text-xs opacity-50">(number literal)</span>
            </code>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
