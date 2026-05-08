import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { TechStack } from "@/components/tech-stack";
import { Philosophy } from "@/components/philosophy";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Services />
        <TechStack />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
