"use client";

import { Check, ChevronDown, Copy } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { REGISTRY_CONFIG } from "@/lib/constants";

const components = [
  { name: "typed-select", label: "TypedSelect" },
  { name: "typed-radio-group", label: "TypedRadioGroup" },
] as const;

type ComponentName = (typeof components)[number]["name"];

const getInstallCommand = (pm: string, component: ComponentName) => {
  const registryUrl = `${REGISTRY_CONFIG.baseUrl}/${component}.json`;
  switch (pm) {
    case "npm":
      return `npx shadcn@latest add ${registryUrl}`;
    case "pnpm":
      return `pnpm dlx shadcn@latest add ${registryUrl}`;
    case "yarn":
      return `npx shadcn@latest add ${registryUrl}`;
    case "bun":
      return `bunx --bun shadcn@latest add ${registryUrl}`;
    default:
      return `npx shadcn@latest add ${registryUrl}`;
  }
};

const packageManagers = ["npm", "pnpm", "yarn", "bun"] as const;
type PackageManager = (typeof packageManagers)[number];

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function InstallCommand() {
  const [activeTab, setActiveTab] = useState<PackageManager>("npm");
  const [selectedComponent, setSelectedComponent] =
    useState<ComponentName>("typed-select");
  const [copied, setCopied] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const command = getInstallCommand(activeTab, selectedComponent);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedLabel = components.find(
    (c) => c.name === selectedComponent,
  )?.label;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: easeOutExpo }}
      className="mx-auto max-w-2xl"
    >
      {/* Component Selector */}
      <div className="mb-3 flex items-center justify-center gap-2">
        <span className="text-sm font-medium text-foreground/70">
          Install component:
        </span>
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            {selectedLabel}
            <motion.span
              animate={{ rotate: dropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </motion.span>
          </button>
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-full z-10 mt-1 min-w-[160px] overflow-hidden rounded-lg border border-border bg-card shadow-lg"
              >
                {components.map((component) => (
                  <button
                    type="button"
                    key={component.name}
                    onClick={() => {
                      setSelectedComponent(component.name);
                      setDropdownOpen(false);
                    }}
                    className={`block w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted ${
                      selectedComponent === component.name
                        ? "bg-muted font-medium"
                        : ""
                    }`}
                  >
                    {component.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Install Command */}
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        {/* Tab bar */}
        <div className="flex items-center justify-between border-b border-border bg-muted/30 px-1 py-1">
          <div className="flex gap-1">
            {packageManagers.map((pm) => (
              <button
                type="button"
                key={pm}
                onClick={() => setActiveTab(pm)}
                className={`relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeTab === pm
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeTab === pm && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg bg-background shadow-sm"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{pm}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1.5 text-green-500"
                >
                  <Check className="h-4 w-4" />
                  <span>Copied!</span>
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1.5"
                >
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Command */}
        <div className="overflow-x-auto p-4">
          <code className="whitespace-nowrap font-mono text-sm">
            <span className="text-muted-foreground">$ </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={command}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {command}
              </motion.span>
            </AnimatePresence>
          </code>
        </div>
      </div>
    </motion.div>
  );
}
