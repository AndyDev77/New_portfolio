// Use client directive at the top of the file
"use client";

// Import necessary packages and components
import { perspective, slideIn } from "@/utils/anim";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { TextReveal } from "./ui";

// Import NAV_LINKS and SOCIALS_LINKS
import { NAV_LINKS, SOCIALS_LINKS } from "@/constants"; // Adjust the import path as necessary

// Interface for props
interface NavProps {
  setIsActive: Dispatch<SetStateAction<boolean>>;
}

// Nav component definition
const Nav = ({ setIsActive }: NavProps) => {
  const MotionLink = motion(Link);

  return (
    <div className="flex justify-between flex-col w-full h-full px-10 pt-[100px] pb-[50px]">
      <div className="flex gap-2 flex-col">
        {NAV_LINKS.map((link, i) => {
          const { title, href } = link;
          return (
            <div key={`b_${i}`} className="linkContainer" onClick={() => setIsActive(false)}>
              <Link href={href} className="flex flex-wrap overflow-hidden">
                <motion.div
                  variants={perspective}
                  custom={i}
                  initial="initial"
                  animate="enter"
                  whileHover="whileHover"
                  whileTap="whileHover"
                  exit="exit"
                  className="text-5xl text-background flex items-center justify-between"
                >
                  <motion.span variants={{ initial: { x: -20 }, whileHover: { x: 0 } }}>
                    <ArrowRight />
                  </motion.span>
                  <motion.span variants={{ initial: { x: 0 }, whileHover: { x: 20 } }}>
                    {title}
                  </motion.span>
                </motion.div>
              </Link>
            </div>
          );
        })}
      </div>
      <motion.div className="flex flex-wrap">
        {SOCIALS_LINKS.map((link, i) => {
          // Use SOCIALS_LINKS here
          const { title, href } = link;
          return (
            <MotionLink
              href={href}
              className="w-1/2 mt-1 text-background"
              variants={slideIn}
              custom={i}
              initial="initial"
              animate="enter"
              exit="exit"
              key={`social_${i}`}
            >
              <TextReveal>{title}</TextReveal>
            </MotionLink>
          );
        })}
      </motion.div>
    </div>
  );
};

// Export the Nav component
export default Nav;
