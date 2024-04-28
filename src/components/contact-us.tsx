"use client";

import Alert from "@/components/Alert";
import { CONTACT, SOCIALS_LINKS } from "@/constants";
import useAlert from "@/hooks/useAlert";
import { cn } from "@/utils/cn";
import emailjs from "@emailjs/browser";
import dotenv from "dotenv";
import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { Input, SectionHeading, SlideIn, Textarea, TextReveal, Transition } from "./ui";
dotenv.config();

interface ContactProps {
  contact: typeof CONTACT; // Adjusted to the structure of CONTACT
  social_links: typeof SOCIALS_LINKS; // Adjusted to SOCIALS_LINKS
}

interface FormInputEvent {
  target: { name: string; value: string };
}

export const ContactUs = ({ contact, social_links }: ContactProps) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { alert, showAlert, hideAlert } = useAlert();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = ({ target: { name, value } }: FormInputEvent) => {
    setForm({ ...form, [name]: value });
  };

  // Inside your handleSubmit function
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "default_value",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "default_value",
        {
          from_name: form.name,
          to_name: "Andy Vespuce",
          from_email: form.email,
          to_email: "vespuceandy@gmail.com",
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID
      )
      .then(() => {
        setIsLoading(false);
        showAlert({
          text: "Merci pour votre message 😃",
          type: "success",
        });

        setTimeout(() => {
          hideAlert();
          setForm({ name: "", email: "", message: "" });
        }, 6000);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        showAlert({
          text: "Je n'ai pas reçu votre message 😢",
          type: "danger",
        });
      });
  };

  return (
    <motion.section className="relative">
      {alert.show && <Alert {...alert} />}
      <form onSubmit={handleSubmit}>
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
                    type="text"
                    name="name"
                    required
                    id="name"
                    placeholder="Nom / Prénom"
                    value={form.name}
                    onChange={handleChange}
                    className="border-0 border-b rounded-none"
                  />
                </Transition>
                <Transition className="w-full">
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="border-0 border-b rounded-none"
                  />
                </Transition>
              </div>
              <div className="space-y-2">
                <Transition>
                  <Textarea
                    className="min-h-[100px] rounded-none border-0 border-b resize-none"
                    id="message"
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Saisir le message"
                  />
                </Transition>
              </div>
              <div>
                <Transition>
                  <motion.button
                    type="submit"
                    whileHover="whileHover"
                    initial="initial"
                    className="border border-white/30 px-8 py-2 rounded-3xl relative overflow-hidden"
                    disabled={isLoading}
                  >
                    <TextReveal className="uppercase">
                      {isLoading ? "Envoi..." : "Discutons du projet "}
                    </TextReveal>
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
      </form>
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
