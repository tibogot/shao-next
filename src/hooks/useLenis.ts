"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export function useLenis() {
  useEffect(() => {
    // Initialize Lenis with minimal configuration
    const lenis = new Lenis();

    // Animation frame function
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup function
    return () => {
      lenis.destroy();
    };
  }, []);
}
