"use client";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "../store/cartStore";

export default function Navbar() {
  const items = useCartStore((s) => s.items);
  const openCart = useCartStore((s) => s.openCart);

  return (
    <nav
      className="font-neue-montreal fixed top-0 right-0 left-0 z-40 flex w-full items-center justify-between px-8 py-6 text-white"
      data-nextjs-scroll-focus-boundary
    >
      {/* Left side - Navigation Links */}
      <div className="flex items-center gap-12">
        <Link
          href="/shop"
          className="text-sm transition-colors hover:text-gray-300"
        >
          SHOP
        </Link>
        <Link
          href="/collection"
          className="text-sm transition-colors hover:text-gray-300"
        >
          COLLECTION
        </Link>
        <Link
          href="/about"
          className="text-sm transition-colors hover:text-gray-300"
        >
          ABOUT US
        </Link>
        <Link
          href="/flip-test"
          className="text-sm transition-colors hover:text-gray-300"
        >
          FLIP-TEST
        </Link>
        <Link
          href="/bout2.tsx"
          className="text-sm transition-colors hover:text-gray-300"
        >
          BOUT2
        </Link>
      </div>

      {/* Center - Logo */}
      <div className="absolute left-1/2 -translate-x-1/2 transform overflow-visible">
        <Link href="/" className="flex items-center">
          <div className="flex h-10 w-24 items-center justify-center overflow-visible">
            <img
              src="/logo.svg"
              alt="Logo"
              className="h-8 w-auto object-cover"
            />
          </div>
        </Link>
      </div>

      {/* Right side - Search, Account, Cart */}
      <div className="flex items-center gap-8">
        <button
          type="button"
          className="cursor-pointer text-sm transition-colors hover:text-gray-300"
          aria-label="Search"
        >
          SEARCH
        </button>
        <Link
          href="/account"
          className="text-sm transition-colors hover:text-gray-300"
          aria-label="Account"
        >
          ACCOUNT
        </Link>
        <button
          type="button"
          className="cursor-pointer text-sm transition-colors hover:text-gray-300"
          onClick={openCart}
          aria-label="Open cart"
        >
          CART({items.length})
        </button>
      </div>
    </nav>
  );
}
