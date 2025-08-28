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
      <LatestProducts />
      <section className="h-svh bg-blue-500">
        <div className="conta">
          <h2 className="text-2xl font-medium">Future skincare</h2>
          <p className="mt-2 text-base">
            Innovative formules to nouish, awaken, and restore your skin
          </p>
        </div>
      </section>
      <h1 className="font-neue-montreal text-4xl font-medium">Hello World</h1>
      <h1 className="font-neue-montreal-mono text-4xl">Hello World</h1>
    </main>
  );
}
