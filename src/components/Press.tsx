"use client";

import Image from "next/image";
import { useState, useRef } from "react";

export default function Press() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const articles = [
    {
      src: "/images/press-1.jpg",
      alt: "SHAO Featured in Beauty Magazine",
      title: "Beauty Magazine Feature",
      description:
        "SHAO's innovative approach to sustainable beauty has caught the attention of industry leaders, highlighting our commitment to natural ingredients and eco-friendly practices.",
    },
    {
      src: "/images/press-2.jpg",
      alt: "Sustainable Beauty Awards 2024",
      title: "Sustainability Award Winner",
      description:
        "Recognized at the 2024 Sustainable Beauty Awards for our groundbreaking bio-fermentation technology and commitment to environmental responsibility in cosmetics.",
    },
    {
      src: "/images/press-3.jpg",
      alt: "Botanical Innovation in Skincare",
      title: "Innovation Spotlight",
      description:
        "Featured in Tech Beauty Review for our unique blend of traditional botanical wisdom with cutting-edge biotechnology, setting new standards in natural skincare.",
    },
    {
      src: "/images/press-4.jpg",
      alt: "SHAO in Vogue Sustainability Issue",
      title: "Vogue Sustainability Feature",
      description:
        "SHAO's commitment to eco-conscious beauty practices has earned us a feature in Vogue's annual sustainability issue, showcasing how luxury and environmental responsibility can coexist.",
    },
  ];

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = 400 + 16; // card width + gap
      const scrollPosition = index * cardWidth;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : articles.length - 1;
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < articles.length - 1 ? currentIndex + 1 : 0;
    scrollToIndex(newIndex);
  };
  return (
    <section className="press px-4 py-12 md:px-8 md:py-16">
      <h2 className="font-neue-montreal-mono text-sm text-black/60 uppercase">
        Press
      </h2>

      {/* Mobile: Horizontal scroll carousel */}
      <div className="mt-8 md:hidden">
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
          >
            {articles.map((article, index) => (
              <article
                key={index}
                className="w-[400px] flex-shrink-0 snap-start"
              >
                <Image
                  src={article.src}
                  alt={article.alt}
                  width={400}
                  height={500}
                  className="mb-2 h-[500px] w-full rounded-sm object-cover"
                  sizes="400px"
                  loading="lazy"
                />
                <div className="font-neue-montreal-mono mt-4 text-sm uppercase">
                  {article.title}
                </div>
                <div className="mt-2 line-clamp-2 text-sm text-gray-600">
                  {article.description}
                </div>
              </article>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="mt-6 flex items-center justify-start gap-4">
            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white transition-colors hover:border-black hover:bg-black hover:text-white"
              aria-label="Previous article"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {articles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    currentIndex === index ? "bg-black" : "bg-gray-300"
                  }`}
                  aria-label={`Go to article ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white transition-colors hover:border-black hover:bg-black hover:text-white"
              aria-label="Next article"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop: Grid layout */}
      <div className="mt-8 hidden grid-cols-1 gap-6 md:grid md:grid-cols-2 lg:grid-cols-4">
        {/* Article 1 */}
        <article className="block">
          <Image
            src="/images/press-1.jpg"
            alt="SHAO Featured in Beauty Magazine"
            width={400}
            height={200}
            className="mb-2 h-[500px] w-full object-cover"
            sizes="(max-width: 1024px) 50vw, 25vw"
            loading="lazy"
          />
          <div className="font-neue-montreal-mono mt-4 text-sm uppercase">
            Beauty Magazine Feature
          </div>
          <div className="mt-2 line-clamp-3 text-sm text-gray-600">
            SHAO's innovative approach to sustainable beauty has caught the
            attention of industry leaders, highlighting our commitment to
            natural ingredients and eco-friendly practices.
          </div>
        </article>

        {/* Article 2 */}
        <article className="block">
          <Image
            src="/images/press-2.jpg"
            alt="Sustainable Beauty Awards 2024"
            width={400}
            height={200}
            className="mb-2 h-[500px] w-full object-cover"
            sizes="(max-width: 1024px) 50vw, 25vw"
            loading="lazy"
          />
          <div className="font-neue-montreal-mono mt-4 text-sm uppercase">
            Sustainability Award Winner
          </div>
          <div className="mt-2 line-clamp-3 text-sm text-gray-600">
            Recognized at the 2024 Sustainable Beauty Awards for our
            groundbreaking bio-fermentation technology and commitment to
            environmental responsibility in cosmetics.
          </div>
        </article>

        {/* Article 3 */}
        <article className="block">
          <Image
            src="/images/press-3.jpg"
            alt="Botanical Innovation in Skincare"
            width={400}
            height={200}
            className="mb-2 h-[500px] w-full object-cover"
            sizes="(max-width: 1024px) 50vw, 25vw"
            loading="lazy"
          />
          <div className="font-neue-montreal-mono mt-4 text-sm uppercase">
            Innovation Spotlight
          </div>
          <div className="mt-2 line-clamp-3 text-sm text-gray-600">
            Featured in Tech Beauty Review for our unique blend of traditional
            botanical wisdom with cutting-edge biotechnology, setting new
            standards in natural skincare.
          </div>
        </article>

        {/* Article 4 */}
        <article className="block">
          <Image
            src="/images/press-4.jpg"
            alt="SHAO in Vogue Sustainability Issue"
            width={400}
            height={200}
            className="mb-2 h-[500px] w-full object-cover"
            sizes="(max-width: 1024px) 50vw, 25vw"
            loading="lazy"
          />
          <div className="font-neue-montreal-mono mt-4 text-sm uppercase">
            Vogue Sustainability Feature
          </div>
          <div className="mt-2 line-clamp-3 text-sm text-gray-600">
            SHAO's commitment to eco-conscious beauty practices has earned us a
            feature in Vogue's annual sustainability issue, showcasing how
            luxury and environmental responsibility can coexist.
          </div>
        </article>
      </div>
    </section>
  );
}
