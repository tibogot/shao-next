"use client";

import Image from "next/image";
import LatestProducts from "../components/LatestProducts";

export default function Home() {
  return (
    <main className="bg-amber-400">
      <div className="hero relative flex h-svh w-full items-center justify-center overflow-visible bg-purple-200 px-4 py-8 md:px-8">
        {/* Logo Container */}
        <div className="relative flex items-center justify-center">
          <img
            src="/logo.svg"
            alt="Logo"
            className="h-auto w-64 object-contain"
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
      <section className="px-4 py-16 md:px-8">
        <h2 className="font-neue-montreal-mono uppercase">
          Rooted in Nature, Born to Glow
        </h2>
        <p className="font-neue-montreal mt-4 max-w-2xl text-xl">
          SHAO celebrates the power of nature's purest ingredients. We blend
          traditional botanical wisdom with cutting-edge sustainable practices
          to create cosmetics that honor both your skin and our planet. Every
          product tells a story of heritage, purity, and conscious beauty.
        </p>
      </section>
      <LatestProducts />
      <section className="flex px-4 py-16 md:px-8">
        <div className="left w-1/2">
          <h2 className="font-neue-montreal-mono uppercase">
            Rooted in Nature, Born to Glow
          </h2>
          <p className="font-neue-montreal mt-4 max-w-2xl text-xl">
            SHAO celebrates the power of nature's purest ingredients. We blend
            traditional botanical wisdom with cutting-edge sustainable practices
            to create cosmetics that honor both your skin and our planet. Every
            product tells a story of heritage, purity, and conscious beauty.
          </p>{" "}
        </div>
        <div className="right w-1/2">
          <img src="/hero.webp" alt="Future skincare" />
        </div>
      </section>
    </main>
  );
}
