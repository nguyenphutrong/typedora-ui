import { createFileRoute } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";
import {
  ComponentShowcase,
  FeatureCards,
  Footer,
  HeroSection,
  InstallCommand,
  Philosophy,
  TypeSafetyDemo,
} from "@/components/home";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      <main className="flex flex-1 flex-col">
        {/* Hero Section */}
        <HeroSection />

        {/* Install Command */}
        <div className="-mt-8 pb-20 z-1">
          <InstallCommand />
        </div>

        {/* Type Safety Demo */}
        <section className="section-compact border-t border-border">
          <TypeSafetyDemo />
        </section>

        {/* Features */}
        <FeatureCards />

        {/* Components */}
        <ComponentShowcase />

        {/* Philosophy */}
        <Philosophy />

        {/* Footer */}
        <Footer />
      </main>
    </HomeLayout>
  );
}
