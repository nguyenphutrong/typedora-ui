import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Sparkles } from "lucide-react";
import { EXTERNAL_LINKS, SITE_CONFIG } from "./constants";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-2 font-semibold">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <span>{SITE_CONFIG.name}</span>
        </div>
      ),
      transparentMode: "top",
    },
    // Enable search toggle (⌘K)
    searchToggle: {
      enabled: true,
    },
    links: [
      {
        text: "Documentation",
        url: "/docs",
        active: "nested-url",
      },
      {
        text: "GitHub",
        url: EXTERNAL_LINKS.github,
        external: true,
      },
    ],
    githubUrl: EXTERNAL_LINKS.github,
  };
}
