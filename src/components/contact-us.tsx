"use client";

import { CONTACT, SOCIALS_LINKS } from "@/constants";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";
import { Input, SectionHeading, SlideIn, Textarea, TextReveal, Transition } from "./ui";

interface ContactProps {
  contact: typeof CONTACT; // Adjusted to the structure of CONTACT
  social_links: typeof SOCIALS_LINKS; // Adjusted to SOCIALS_LINKS
}

export const ContactUs = ({ contact, social_links }: ContactProps) => {
  return (
    <motion.section className="relative">
      <span className="blob size-1/2 absolute top-20 right-0 blur-[100px]" />
      <div className="p-4 md:p-8 md:px-16">
        <SectionHeading className="">
          <SlideIn className="text-white/40">Intéressé par une discussion,</SlideIn> <br />{" "}
          <SlideIn>faisons-le.</SlideIn>
        </SectionHeading>
        <div className="grid md:grid-cols-2 gap-10 md:pt-16">
          <div className="space-y-4">
            <div className="flex gap-4">
              <Transition className="w-full">
                <Input
                  id="full-name"
                  placeholder="Nom / Prénom"
                  className="border-0 border-b rounded-none"
                />
              </Transition>
              <Transition className="w-full">
                <Input
                  id="email"
                  placeholder="Email"
                  type="email"
                  className="border-0 border-b rounded-none"
                />
              </Transition>
            </div>
            <div className="space-y-2">
              <Transition>
                <Input
                  id="subject"
                  placeholder="Saisir le sujet"
                  className="border-0 border-b rounded-none"
                />
              </Transition>
            </div>
            <div className="space-y-2">
              <Transition>
                <Textarea
                  className="min-h-[100px] rounded-none border-0 border-b resize-none"
                  id="message"
                  placeholder="Saisir le message"
                />
              </Transition>
            </div>
            <div>
              <Transition>
                <motion.button
                  whileHover="whileHover"
                  initial="initial"
                  className="border border-white/30 px-8 py-2 rounded-3xl relative overflow-hidden"
                >
                  <TextReveal className="uppercase">Discutons du projet</TextReveal>
                </motion.button>
              </Transition>
            </div>
          </div>
          <div className="md:justify-self-end flex flex-col">
            <div className="pb-4">
              <Transition>
                <span className="text-white/90">Prendre contact</span>
              </Transition>
              <div className="text-2xl md:text-4xl font-bold py-2">
                <Transition>
                  <TextReveal>{contact.email}</TextReveal>
                </Transition>
              </div>
              <Transition>
                <div className="pb-1 text-white/80">{contact.phoneNumber}</div>
              </Transition>
              <Transition>
                <div className="text-white/80">{contact.address}</div>
              </Transition>
            </div>

            <div className="flex md:gap-8 gap-4 mt-auto md:pb-16">
              {social_links.map(
                (social, index) =>
                  social.enabled && ( // Use 'social_links' and check 'enabled'
                    <Transition key={social._id} transition={{ delay: 0.4 + index * 0.1 }}>
                      <Link href={social.href}>
                        <Link href="/">
                          <TextReveal>{social.title}</TextReveal> {/* Use social.platform */}
                        </Link>
                      </Link>
                    </Transition>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
      <footer className="flex items-center justify-between md:px-8 px-2 py-4 text-sm">
        <Transition>
          <div>&copy; {new Date().getFullYear()} Andy Vespuce</div>
        </Transition>
        <Transition>
          <p>Développé par Andy Vespuce.</p>
        </Transition>
      </footer>
    </motion.section>
  );
};

interface BackgroundScaleProps {
  children: ReactNode;
  className?: string;
}

export const BackgroundScale = ({ children, className }: BackgroundScaleProps) => {
  return (
    <motion.div
      whileHover="whileHover"
      whileFocus="whileHover"
      whileTap="whileHover"
      initial="initial"
      className={cn("relative p-1 group", className)}
    >
      <motion.span
        variants={{
          initial: { scaleY: 0 },
          whileHover: { scaleY: 1 },
        }}
        className="absolute top-0 left-0 h-full w-full bg-primary -z-10 group-hover:text-black"
      />
      {children}
    </motion.div>
  );
};
