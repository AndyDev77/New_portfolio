"use client";

import { ContextProvider } from "@/utils/context";
import { ReactNode } from "react";
import { Cursor } from "./cursor";
import SmoothScroll from "./smooth-scroll";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SmoothScroll>
        <ContextProvider>
          <Cursor />
          {children}
        </ContextProvider>
      </SmoothScroll>
    </>
  );
};
