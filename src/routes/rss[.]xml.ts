import { createFileRoute } from "@tanstack/react-router";
import { generateRegistryRssFeed } from "@wandry/analytics-sdk";

export const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const baseUrl = `${new URL(request.url).origin}`;

        const rssXml = await generateRegistryRssFeed({
          baseUrl,
          rss: {
            title: "@registry",
            description: "Subscribe to @registry updates",
            link: "https://typedora-ui.netlify.app",
            pubDateStrategy: "githubLastEdit",
          },
          github: {
            owner: "nguyenphutrong",
            repo: "typedora-ui",
            token: process.env.GITHUB_TOKEN,
          },
          blocksUrl: "/docs/blocks",
          libsUrl: "/docs/libs",
          componentsUrl: "/docs/components",
        });

        if (!rssXml) {
          return new Response("RSS feed not available", {
            status: 404,
            headers: { "Content-Type": "text/plain" },
          });
        }

        return new Response(rssXml, {
          headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control":
              "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
          },
        });
      },
    },
  },
});
