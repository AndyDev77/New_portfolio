"use client";
import Lenis from "@studio-freight/lenis";
import { ReactNode, useEffect } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    window.scrollTo(0, 0);

    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return children;
}
