import SearchDialog from "fumadocs-ui/components/dialog/search-default";
import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Typedora UI - Type-Safe Components for React",
    template: "%s | Typedora UI",
  },
  description:
    "Type-safe React components with full TypeScript inference. Drop-in replacements for shadcn/ui with zero runtime cost.",
  keywords: [
    "React",
    "TypeScript",
    "UI Components",
    "Type-Safe",
    "shadcn/ui",
    "Tailwind CSS",
    "Radix UI",
  ],
  authors: [{ name: "Typedora" }],
  creator: "Typedora",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://typedora-ui.netlify.app",
    title: "Typedora UI - Type-Safe Components for React",
    description:
      "Type-safe React components with full TypeScript inference. Drop-in replacements for shadcn/ui with zero runtime cost.",
    siteName: "Typedora UI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Typedora UI - Type-Safe Components for React",
    description:
      "Type-safe React components with full TypeScript inference. Drop-in replacements for shadcn/ui with zero runtime cost.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <RootProvider
          search={{
            SearchDialog,
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
