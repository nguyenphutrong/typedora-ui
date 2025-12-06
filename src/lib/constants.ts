// Site configuration constants
export const SITE_CONFIG = {
  name: "Typedora UI",
  description:
    "Type-safe React components with full TypeScript inference. Drop-in replacements for shadcn/ui with zero runtime cost.",
  url: "https://typedora-ui.netlify.app",
} as const;

// External links
export const EXTERNAL_LINKS = {
  github: "https://github.com/nguyenphutrong/typedora-ui",
  shadcnUi: "https://ui.shadcn.com",
} as const;

// Registry configuration
export const REGISTRY_CONFIG = {
  baseUrl: `${SITE_CONFIG.url}/r`,
} as const;
