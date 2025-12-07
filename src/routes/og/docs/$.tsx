import { createFileRoute } from "@tanstack/react-router";
import { ImageResponse } from "@vercel/og";
import { source } from "@/lib/source";

export const Route = createFileRoute("/og/docs/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const slugParts = params._splat?.split("/") ?? [];
        // Remove 'image.png' from the end
        const slug = slugParts.slice(0, -1);
        const page = source.getPage(slug);

        if (!page) {
          return new Response("Not Found", { status: 404 });
        }

        return new ImageResponse(
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              backgroundColor: "#0a0a0a",
              padding: "80px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #f97316, #ef4444)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "16px",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              </div>
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: 600,
                  color: "#a1a1aa",
                }}
              >
                Typedora UI
              </span>
            </div>
            <div
              style={{
                fontSize: "64px",
                fontWeight: 700,
                color: "#fafafa",
                lineHeight: 1.2,
                marginBottom: "16px",
              }}
            >
              {page.data.title}
            </div>
            {page.data.description && (
              <div
                style={{
                  fontSize: "28px",
                  color: "#a1a1aa",
                  lineHeight: 1.4,
                }}
              >
                {page.data.description}
              </div>
            )}
          </div>,
          {
            width: 1200,
            height: 630,
          },
        );
      },
    },
  },
});
