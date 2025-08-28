"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#FBFBFB] px-4 pt-16 pb-8 md:px-8">
      <div>
        {/* Main footer content */}
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          {/* Links Block - Left Side */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* SHOP Section */}
            <div>
              <h3 className="font-neue-montreal-mono mb-6 text-sm font-medium tracking-wider text-black uppercase">
                SHOP
              </h3>
              <ul className="space-y-1">
                <li>
                  <a
                    href="/products"
                    className="font-neue-montreal text-sm text-black/70 transition-colors hover:text-black"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="font-neue-montreal text-sm text-black/70 transition-colors hover:text-black"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/pricing"
                    className="font-neue-montreal text-sm text-black/70 transition-colors hover:text-black"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="/community"
                    className="font-neue-montreal text-sm text-black/70 transition-colors hover:text-black"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div>

            {/* LEARN Section */}
            <div>
              <h3 className="font-neue-montreal-mono mb-6 text-sm font-medium tracking-wider text-black uppercase">
                LEARN
              </h3>
              <ul className="space-y-1">
                <li>
                  <a
                    href="/shop"
                    className="font-neue-montreal text-sm text-black/70 transition-colors hover:text-black"
                  >
                    Shop
                  </a>
                </li>
                <li>
                  <a
                    href="/faq"
                    className="font-neue-montreal text-sm text-black/70 transition-colors hover:text-black"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="/results"
                    className="font-neue-montreal text-sm text-black/70 transition-colors hover:text-black"
                  >
                    Results
                  </a>
                </li>
                <li>
                  <a
                    href="/journal"
                    className="font-neue-montreal text-sm text-black/70 transition-colors hover:text-black"
                  >
                    Journal
                  </a>
                </li>
              </ul>
            </div>

            {/* SOCIAL MEDIA Section */}
            <div>
              <h3 className="font-neue-montreal-mono mb-6 text-sm font-medium tracking-wider text-black uppercase">
                SOCIAL MEDIA
              </h3>
              <ul className="space-y-1">
                <li>
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-neue-montreal text-sm text-black/70 transition-colors hover:text-black"
                  >
                    TikTok
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-neue-montreal text-sm text-black/70 transition-colors hover:text-black"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@shao.com"
                    className="font-neue-montreal text-sm text-black/70 transition-colors hover:text-black"
                  >
                    info@shao.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Section - Right Side */}
          <div className="flex-shrink-0 md:max-w-md">
            <h3 className="font-neue-montreal-mono mb-6 text-sm font-medium tracking-wider text-black uppercase">
              SUBSCRIBE TO OUR NEWSLETTER
            </h3>
            <p className="font-neue-montreal mb-6 max-w-md text-sm text-black/70">
              Stay updated with our latest product launches, skincare tips, and
              exclusive offers. Join our community of conscious beauty
              enthusiasts.
            </p>
            <form className="max-w-md space-y-3">
              <input
                type="email"
                placeholder="Email address"
                className="font-neue-montreal w-full border-b border-black/20 bg-transparent pb-2 text-sm text-black placeholder-black/50 focus:border-black focus:outline-none"
              />
              <button
                type="submit"
                className="font-neue-montreal w-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black/80"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-black/10"></div>

        {/* Bottom section with logo and copyright */}
        <div className="flex flex-col items-end justify-between space-y-6 md:flex-row md:space-y-0">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/logo.svg"
              alt="Shao"
              className="h-24 w-auto object-contain brightness-0"
            />
          </div>

          {/* Copyright */}
          <p className="font-neue-montreal text-sm text-black/60">
            © 2025 | Shao.
          </p>
        </div>
      </div>
    </footer>
  );
}
