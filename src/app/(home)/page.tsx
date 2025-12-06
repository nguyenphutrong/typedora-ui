import {
  ComponentShowcase,
  FeatureCards,
  Footer,
  HeroSection,
  InstallCommand,
  Philosophy,
  TypeSafetyDemo,
} from "@/components/home";

export default function HomePage() {
  return (
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
  );
}
