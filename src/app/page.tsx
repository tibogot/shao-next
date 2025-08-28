"use client";

import Image from "next/image";
import LatestProducts from "../components/LatestProducts";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <main className="bg-[#FBFBFB]">
      <div className="hero relative flex h-svh w-full items-center justify-center overflow-visible bg-purple-200 px-4 py-16 md:px-8 md:py-8">
        {/* Logo Container */}
        <div className="relative flex items-center justify-center">
          <img
            src="/logo.svg"
            alt="Logo"
            className="h-auto w-48 object-contain md:w-64"
          />
        </div>
        <Image
          src="/hero-1.webp"
          alt="Hero"
          width={1000}
          height={1000}
          className="absolute inset-0 h-full w-full object-cover"
          priority
        />

        {/* Big Centered Logo */}
        {/* <div className="z-20 flex items-center justify-center overflow-visible"> */}

        {/* </div> */}

        {/* <div className="hero-text font-neue-montreal z-10 text-white">
          <h2 className="text-2xl font-medium"> Future skincare </h2>
          <p className="mt-2 text-base">
            Innovative formules to nouish, awaken, and restore your skin
          </p>
          <button className="btn-primary mt-8"> Shop now </button>
        </div> */}
      </div>
      <section className="px-4 py-12 md:px-8 md:py-16">
        <h2 className="font-neue-montreal-mono text-sm text-black/60 uppercase">
          Rooted in Nature, Born to Glow
        </h2>
        <p className="font-neue-montreal mt-6 max-w-xl text-lg md:mt-8 md:text-xl">
          SHAO celebrates the power of nature's purest ingredients. We blend
          traditional botanical wisdom with cutting-edge sustainable practices
          to create cosmetics that honor both your skin and our planet. Every
          product tells a story of heritage, purity, and conscious beauty.
        </p>
      </section>
      <LatestProducts />
      <section className="flex flex-col gap-6 px-4 py-12 md:flex-row md:gap-8 md:px-8 md:py-16">
        <div className="md:w-1/2">
          <h2 className="font-neue-montreal-mono text-sm text-black/60 uppercase">
            Sustainability Promise
          </h2>
          <p className="font-neue-montreal mt-6 max-w-xl text-lg md:mt-8 md:text-xl">
            Advanced formulas for slow rituals, REOME's elevated skincare is
            powered by biotechnology and bio-fermentation, with one singular
            intention: to heal and restore skin.
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src="/hero.webp"
            alt="Future skincare"
            className="w-full object-cover"
          />
        </div>
      </section>
      <FAQ />
      <section className="px-4 py-12 md:px-8 md:py-16">
        <h2 className="font-neue-montreal-mono text-sm text-black/60 uppercase">
          Rooted in Nature, Born to Glow
        </h2>
        <p className="font-neue-montreal mt-6 max-w-xl text-lg md:mt-8 md:text-xl">
          SHAO celebrates the power of nature's purest ingredients. We blend
          traditional botanical wisdom with cutting-edge sustainable practices
          to create cosmetics that honor both your skin and our planet. Every
          product tells a story of heritage, purity, and conscious beauty.
        </p>
      </section>
      <section className="flex flex-col gap-6 px-4 py-12 md:flex-row-reverse md:gap-8 md:px-8 md:py-16">
        <div className="md:w-1/2">
          <h2 className="font-neue-montreal-mono text-sm text-black/60 uppercase">
            Sustainability Promise
          </h2>
          <p className="font-neue-montreal mt-6 max-w-xl text-lg md:mt-8 md:text-xl">
            Advanced formulas for slow rituals, REOME's elevated skincare is
            powered by biotechnology and bio-fermentation, with one singular
            intention: to heal and restore skin.
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src="/hero.webp"
            alt="Future skincare"
            className="w-full object-cover"
          />
        </div>
      </section>

      <section className="relative flex h-[60vh] items-end px-4 py-12 md:h-svh md:px-8 md:py-16">
        <div className="relative z-10 text-white">
          <h2 className="font-neue-montreal-mono text-sm text-white/70 uppercase">
            Active Recovery
          </h2>
          <p className="font-neue-montreal mt-6 max-w-xl text-lg md:mt-8 md:text-xl">
            Advanced formulas for slow rituals, REOME's elevated skincare is
            powered by biotechnology and bio-fermentation, with one singular
            intention: to heal and restore skin.
          </p>
        </div>
        <Image
          src="/hero.webp"
          alt="Future skincare"
          width={1000}
          height={1000}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </section>
    </main>
  );
}
