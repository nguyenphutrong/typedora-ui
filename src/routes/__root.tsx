import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import * as React from "react";
import appCss from "@/styles/app.css?url";
import { RootProvider } from "fumadocs-ui/provider/tanstack";
import SearchDialog from "@/components/search";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Typedora UI - Type-Safe Components for React",
      },
      {
        name: "description",
        content:
          "Type-safe React components with full TypeScript inference. Drop-in replacements for shadcn/ui with zero runtime cost.",
      },
      {
        name: "keywords",
        content:
          "React, TypeScript, UI Components, Type-Safe, shadcn/ui, Tailwind CSS, Radix UI",
      },
      {
        name: "author",
        content: "Typedora",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:locale",
        content: "en_US",
      },
      {
        property: "og:url",
        content: "https://typedora-ui.netlify.app",
      },
      {
        property: "og:title",
        content: "Typedora UI - Type-Safe Components for React",
      },
      {
        property: "og:description",
        content:
          "Type-safe React components with full TypeScript inference. Drop-in replacements for shadcn/ui with zero runtime cost.",
      },
      {
        property: "og:site_name",
        content: "Typedora UI",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "Typedora UI - Type-Safe Components for React",
      },
      {
        name: "twitter:description",
        content:
          "Type-safe React components with full TypeScript inference. Drop-in replacements for shadcn/ui with zero runtime cost.",
      },
      {
        name: "robots",
        content: "index, follow",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <RootProvider search={{ SearchDialog }}>{children}</RootProvider>
        <Scripts />
      </body>
    </html>
  );
}
