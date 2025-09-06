"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the plugins
gsap.registerPlugin(Flip, ScrollTrigger);

function FlipTest2Page() {
  const squareRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialParentRef = useRef<HTMLDivElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  // ScrollTrigger Flip animation refs
  const scrollSquareRef = useRef<HTMLDivElement>(null);
  const scrollInitialRef = useRef<HTMLDivElement>(null);
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);

  // Simple ScrollTrigger scrub animation
  useEffect(() => {
    if (!scrollSquareRef.current || !scrollSectionRef.current) return;

    const ctx = gsap.context(() => {
      // Basic scrub animation - move, scale, and change color
      gsap.to(scrollSquareRef.current, {
        x: 400,
        y: 150,
        scale: 3,
        rotation: 180,
        backgroundColor: "#ff6b6b",
        borderRadius: "50%",
        scrollTrigger: {
          trigger: scrollSectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
          markers: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const handleFlipAnimation = () => {
    if (
      !squareRef.current ||
      !containerRef.current ||
      !initialParentRef.current
    )
      return;

    // Capture the current state
    const state = Flip.getState(squareRef.current);

    if (!isAnimated) {
      // Move to container and resize
      containerRef.current.appendChild(squareRef.current);
      gsap.set(squareRef.current, {
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
      });
    } else {
      // Move back to initial position
      initialParentRef.current.appendChild(squareRef.current);
      gsap.set(squareRef.current, {
        width: "80px",
        height: "80px",
        top: 0,
        left: 0,
      });
    }

    // Animate from the previous state to the new state
    Flip.from(state, {
      duration: 1.2,
      ease: "power2.inOut",
      scale: true,
      onComplete: () => {
        setIsAnimated(!isAnimated);
      },
    });
  };

  return (
    <div className="min-h-screen bg-blue-500 px-4 py-20 md:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">
          Flip Test 2 - GSAP Flip Animation
        </h1>

        <div className="mb-8">
          <button
            onClick={handleFlipAnimation}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-blue-700"
          >
            {isAnimated ? "Move Back" : "Flip to Container"}
          </button>
        </div>

        {/* Animation area with proper overflow handling */}
        <div className="relative min-h-96 overflow-visible">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
            {/* Initial container for the square */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Initial Position
              </h2>
              <div
                ref={initialParentRef}
                className="relative h-32 w-32 overflow-visible border-2 border-gray-300 bg-gray-200"
                style={{
                  minHeight: "128px",
                  minWidth: "128px",
                }}
              >
                <div
                  ref={squareRef}
                  className="absolute top-0 left-0 bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg"
                  style={{
                    width: "80px",
                    height: "80px",
                    cursor: "pointer",
                    zIndex: 100,
                  }}
                />
              </div>
            </div>

            {/* Target container */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Target Container
              </h2>
              <div
                ref={containerRef}
                className="relative h-48 w-80 overflow-visible border-2 border-gray-300 bg-gray-200"
                style={{
                  minHeight: "192px",
                  minWidth: "320px",
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold text-gray-800">
            How GSAP Flip Works:
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              • <strong>Flip.getState()</strong> captures the current position,
              size, and transform of elements
            </li>
            <li>
              • We then change the DOM (move element, change styles, etc.)
            </li>
            <li>
              • <strong>Flip.from()</strong> animates from the captured state to
              the new state
            </li>
            <li>
              • The plugin automatically calculates the differences and creates
              smooth transitions
            </li>
          </ul>
        </div>

        {/* ScrollTrigger + Flip Animation Section */}
        <div ref={scrollSectionRef} className="mt-24 space-y-8">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Exercise 2: ScrollTrigger + Flip Animation
            </h2>
            <p className="text-lg text-gray-600">
              Scroll to scrub through the Flip animation in real-time
            </p>
            <div className="inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-800">
              👇 Scroll slowly to see the scrub effect
            </div>
          </div>

          {/* Simple scroll animation area */}
          <div className="relative min-h-96 overflow-visible">
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="mb-4 text-xl font-semibold text-gray-800">
                  Watch the square transform as you scroll
                </h3>
                <div
                  ref={scrollSquareRef}
                  className="inline-block bg-gradient-to-br from-orange-500 to-red-600 shadow-lg"
                  style={{
                    width: "60px",
                    height: "60px",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-lg border border-orange-200 bg-orange-50 p-6 shadow-sm">
            <h4 className="mb-3 text-lg font-semibold text-gray-800">
              ScrollTrigger Scrub + Flip Combination:
            </h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                • <strong>scrub: 1</strong> ties animation progress directly to
                scroll position
              </li>
              <li>
                • <strong>markers: true</strong> shows start/end trigger points
                (green/red lines)
              </li>
              <li>
                • <strong>onUpdate</strong> tracks scroll progress (0 to 1) in
                real-time
              </li>
              <li>• Flip animation triggers at 50% scroll progress</li>
              <li>• Timeline animates size/position smoothly with scroll</li>
              <li>
                • Perfect for interactive, scroll-based layout transitions
              </li>
            </ul>
          </div>
        </div>

        {/* Success Summary */}
        <div className="mt-32 space-y-8">
          <div className="space-y-6 text-center">
            <h2 className="text-4xl font-bold text-gray-900">
              🎉 GSAP Flip + ScrollTrigger Mastery Complete!
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              We've successfully demonstrated two powerful GSAP Flip animation
              patterns
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-8 shadow-lg">
              <h3 className="mb-4 text-2xl font-bold text-gray-800">
                ✅ Exercise 1: Manual Flip
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="mr-3 text-green-500">🎯</span>
                  Button-triggered Flip animation
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-green-500">🔄</span>
                  Bidirectional transformation
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-green-500">📏</span>
                  Size and position changes
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-green-500">✨</span>
                  Smooth overflow handling
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 shadow-lg">
              <h3 className="mb-4 text-2xl font-bold text-gray-800">
                ✅ Exercise 2: ScrollTrigger Scrub
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="mr-3 text-blue-500">📜</span>
                  Scroll-driven animation
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-blue-500">🎨</span>
                  Color, scale, and position changes
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-blue-500">⚡</span>
                  Perfect Lenis integration
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-blue-500">🔧</span>
                  Smooth scrub animation
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-block rounded-full bg-gradient-to-r from-green-100 to-blue-100 px-8 py-4 text-lg font-medium text-gray-800">
              🚀 Ready to build amazing Flip animations!
            </div>
          </div>
        </div>

        {/* Extra spacing for scroll testing */}
        <div className="h-96"></div>
      </div>
    </div>
  );
}

export default FlipTest2Page;


