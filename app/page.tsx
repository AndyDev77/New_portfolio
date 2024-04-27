import About from "@/components/about";
import { ContactUs } from "@/components/contact-us";
import Experience from "@/components/experience";
import Header from "@/components/header";
import { Hero } from "@/components/hero";
import Projects from "@/components/projects";
import {
  HoverImageLink,
  ParallaxText,
  SectionHeading,
  SlideIn,
  TextReveal,
  Transition,
} from "@/components/ui";
import { CONTACT, SERVICES, Skills, SOCIALS_LINKS } from "@/constants"; // Assuming the export is from constants file
import Link from "next/link";

const Page = () => {
  return (
    <main className="relative">
      <Transition className="fixed md:top-8 top-6 md:left-8 left-6 z-30 hover:text-white/80 text-white/40">
        <Link href="/">
          <TextReveal className="font-semibold">Andy Vespuce</TextReveal>
        </Link>
      </Transition>
      <Header />
      <Hero />
      <About />
      <Experience />
      {/* ===SKILLS SECTION=== */}
      <section id="skills">
        <ParallaxText baseVelocity={-5}>
          {Skills.sort((a, b) => a.sequence - b.sequence).map((skill, index) => (
            <span key={index} className="md:text-7xl text-xl font-semibold uppercase text-white/30">
              {skill.name}
            </span>
          ))}
        </ParallaxText>
        <ParallaxText baseVelocity={5}>
          {Skills.sort((a, b) => a.sequence - b.sequence).map((skill, index) => (
            <span key={index} className="md:text-7xl text-xl font-semibold uppercase text-white/30">
              {skill.name}
            </span>
          ))}
        </ParallaxText>
        <ParallaxText baseVelocity={-5}>
          {Skills.sort((a, b) => a.sequence - b.sequence).map((skill, index) => (
            <span key={index} className="md:text-7xl text-xl font-semibold uppercase text-white/30">
              {skill.name}
            </span>
          ))}
        </ParallaxText>
      </section>
      {/* ===SERVICES SECTION=== */}
      <section className="px-2 py-20 relative" id="services">
        <span className="blob absolute top-[20%] right-0 w-1/3 h-5/6 blur-[100px] rotate-180 -z-10" />
        <SectionHeading className="md:pl-16 overflow-hidden">
          <SlideIn className="text-white/40">Voici comment</SlideIn> <br />
          <SlideIn>Je peux vous aider</SlideIn>
        </SectionHeading>
        <div className="mx-auto pt-10">
          {SERVICES.map((service) => (
            <Transition key={service._id}>
              <HoverImageLink
                heading={service.name}
                href=""
                imgSrc={service.image_url}
                subheading={service.desc}
              />
            </Transition>
          ))}
        </div>
        <Transition className="flex items-center py-10 md:hidden">
          <div className="p-4 rounded-full border border-white/50">
            <span>Discuss the project</span>
          </div>
        </Transition>
        <Projects />
      </section>
      <div className="rounded-t-[2rem] md:rounded-t-[3rem] overflow-hidden" id="contact">
        <ContactUs contact={CONTACT} social_links={SOCIALS_LINKS} />
      </div>
    </main>
  );
};

export default Page;
