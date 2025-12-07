"use client";

import { useState } from "react";
import { TypedCombobox } from "@/components/typed-combobox";

const frameworks = [
  { label: "Next.js", value: "nextjs" },
  { label: "Remix", value: "remix" },
  { label: "Astro", value: "astro" },
  { label: "SvelteKit", value: "sveltekit" },
] as const;

type FrameworkValue = (typeof frameworks)[number]["value"];

export function Controlled() {
  const [value, setValue] = useState<FrameworkValue>("nextjs");

  return (
    <div className="space-y-4">
      <TypedCombobox
        placeholder="Select a framework..."
        searchPlaceholder="Search..."
        options={frameworks}
        value={value}
        onValueChange={setValue}
      />
      <p className="text-sm text-muted-foreground">
        Selected: <code className="font-mono">{value}</code>
      </p>
    </div>
  );
}
