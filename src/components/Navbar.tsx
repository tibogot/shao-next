"use client";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "../store/cartStore";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";

export default function Navbar() {
  const items = useCartStore((s) => s.items);
  const openCart = useCartStore((s) => s.openCart);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track scroll position
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Change navbar style when scrolled past hero section (100vh)
    const heroHeight = typeof window !== "undefined" ? window.innerHeight : 800;
    setIsScrolled(latest > heroHeight * 0.8); // Trigger at 80% of hero height
  });

  return (
    <motion.nav
      className="font-neue-montreal fixed top-0 right-0 left-0 z-40 flex w-full items-center justify-between px-4 py-4 md:px-8 md:py-6"
      data-nextjs-scroll-focus-boundary
      animate={{
        backgroundColor: isScrolled
          ? "rgba(255, 255, 255, 0.95)"
          : "rgba(255, 255, 255, 0)",
        backdropFilter: isScrolled ? "blur(10px)" : "blur(0px)",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        color: isScrolled ? "#000000" : "#ffffff",
      }}
    >
      {/* Mobile Hamburger - Left */}
      <motion.button
        className="flex cursor-pointer flex-col gap-1 md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        animate={{
          color: isScrolled ? "#000000" : "#ffffff",
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.span
          className="h-0.5 w-6 bg-current"
          animate={{
            rotate: isMobileMenuOpen ? 45 : 0,
            y: isMobileMenuOpen ? 6 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="h-0.5 w-6 bg-current"
          animate={{
            opacity: isMobileMenuOpen ? 0 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="h-0.5 w-6 bg-current"
          animate={{
            rotate: isMobileMenuOpen ? -45 : 0,
            y: isMobileMenuOpen ? -6 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Desktop Left side - Navigation Links (hidden on mobile) */}
      <div className="hidden items-center gap-12 md:flex">
        <motion.div
          animate={{
            color: isScrolled ? "#000000" : "#ffffff",
          }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/shop"
            className={`font-neue-montreal-mono cursor-pointer text-sm transition-colors ${
              isScrolled ? "hover:text-black/60" : "hover:text-white/60"
            }`}
          >
            SHOP
          </Link>
        </motion.div>
        <motion.div
          animate={{
            color: isScrolled ? "#000000" : "#ffffff",
          }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/collection"
            className={`font-neue-montreal-mono cursor-pointer text-sm transition-colors ${
              isScrolled ? "hover:text-black/60" : "hover:text-white/60"
            }`}
          >
            COLLECTION
          </Link>
        </motion.div>
        <motion.div
          animate={{
            color: isScrolled ? "#000000" : "#ffffff",
          }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/about"
            className={`font-neue-montreal-mono cursor-pointer text-sm transition-colors ${
              isScrolled ? "hover:text-black/60" : "hover:text-white/60"
            }`}
          >
            ABOUT US
          </Link>
        </motion.div>
        <motion.div
          animate={{
            color: isScrolled ? "#000000" : "#ffffff",
          }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/flip-test"
            className={`font-neue-montreal-mono cursor-pointer text-sm transition-colors ${
              isScrolled ? "hover:text-black/60" : "hover:text-white/60"
            }`}
          >
            FLIP-TEST
          </Link>
        </motion.div>
        <motion.div
          animate={{
            color: isScrolled ? "#000000" : "#ffffff",
          }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/bout2.tsx"
            className={`font-neue-montreal-mono cursor-pointer text-sm transition-colors ${
              isScrolled ? "hover:text-black/60" : "hover:text-white/60"
            }`}
          >
            BOUT2
          </Link>
        </motion.div>
      </div>

      {/* Center - Logo */}
      <div className="absolute left-1/2 -translate-x-1/2 transform overflow-visible">
        <Link href="/" className="flex cursor-pointer items-center">
          <div className="flex h-8 w-16 items-center justify-center overflow-visible md:h-10 md:w-24">
            <motion.img
              src="/logo.svg"
              alt="Logo"
              className="h-6 w-auto object-cover md:h-8"
              animate={{
                filter: isScrolled ? "brightness(0)" : "brightness(1)",
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </Link>
      </div>

      {/* Right side - Cart (mobile), Search/Account/Cart (desktop) */}
      <div className="flex items-center gap-4 md:gap-8">
        {/* Mobile - Only Cart */}
        <motion.button
          type="button"
          className={`font-neue-montreal-mono cursor-pointer text-sm transition-colors md:hidden ${
            isScrolled ? "hover:text-black/60" : "hover:text-white/60"
          }`}
          onClick={openCart}
          aria-label="Open cart"
          animate={{
            color: isScrolled ? "#000000" : "#ffffff",
          }}
          transition={{ duration: 0.3 }}
        >
          CART({items.length})
        </motion.button>

        {/* Desktop - All actions */}
        <motion.button
          type="button"
          className={`font-neue-montreal-mono hidden cursor-pointer text-sm transition-colors md:block ${
            isScrolled ? "hover:text-black/60" : "hover:text-white/60"
          }`}
          aria-label="Search"
          animate={{
            color: isScrolled ? "#000000" : "#ffffff",
          }}
          transition={{ duration: 0.3 }}
        >
          SEARCH
        </motion.button>
        <motion.div
          className="hidden md:block"
          animate={{
            color: isScrolled ? "#000000" : "#ffffff",
          }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/account"
            className={`font-neue-montreal-mono cursor-pointer text-sm transition-colors ${
              isScrolled ? "hover:text-black/60" : "hover:text-white/60"
            }`}
            aria-label="Account"
          >
            ACCOUNT
          </Link>
        </motion.div>
        <motion.button
          type="button"
          className={`font-neue-montreal-mono hidden cursor-pointer text-sm transition-colors md:block ${
            isScrolled ? "hover:text-black/60" : "hover:text-white/60"
          }`}
          onClick={openCart}
          aria-label="Open cart"
          animate={{
            color: isScrolled ? "#000000" : "#ffffff",
          }}
          transition={{ duration: 0.3 }}
        >
          CART({items.length})
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        className="fixed inset-0 top-16 z-30 bg-black/95 backdrop-blur-lg md:hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          y: isMobileMenuOpen ? 0 : -20,
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center justify-center space-y-8 pt-16">
          <motion.div
            className="flex flex-col items-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isMobileMenuOpen ? 1 : 0,
              y: isMobileMenuOpen ? 0 : 20,
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Link
              href="/shop"
              className="font-neue-montreal-mono cursor-pointer text-lg text-white transition-colors hover:text-white/60"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              SHOP
            </Link>
            <Link
              href="/collection"
              className="font-neue-montreal-mono cursor-pointer text-lg text-white transition-colors hover:text-white/60"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              COLLECTION
            </Link>
            <Link
              href="/about"
              className="font-neue-montreal-mono cursor-pointer text-lg text-white transition-colors hover:text-white/60"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ABOUT US
            </Link>
            <Link
              href="/flip-test"
              className="font-neue-montreal-mono cursor-pointer text-lg text-white transition-colors hover:text-white/60"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FLIP-TEST
            </Link>
            <Link
              href="/bout2.tsx"
              className="font-neue-montreal-mono cursor-pointer text-lg text-white transition-colors hover:text-white/60"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              BOUT2
            </Link>
          </motion.div>

          <motion.div
            className="flex flex-col items-center space-y-4 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isMobileMenuOpen ? 1 : 0,
              y: isMobileMenuOpen ? 0 : 20,
            }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <button
              type="button"
              className="font-neue-montreal-mono cursor-pointer text-base text-white/70 transition-colors hover:text-white"
              aria-label="Search"
            >
              SEARCH
            </button>
            <Link
              href="/account"
              className="font-neue-montreal-mono cursor-pointer text-base text-white/70 transition-colors hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ACCOUNT
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
