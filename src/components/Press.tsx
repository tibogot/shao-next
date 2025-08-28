"use client";

export default function Press() {
  return (
    <section className="press px-4 py-12 md:px-8 md:py-16">
      <h2 className="font-neue-montreal-mono text-sm text-black/60 uppercase">
        Press
      </h2>

      {/* Articles Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Article 1 */}
        <article className="block rounded-sm">
          <img
            src="/hero.webp"
            alt="SHAO Featured in Beauty Magazine"
            className="mb-2 h-[450px] w-full rounded object-cover"
          />
          <div className="font-neue-montreal-mono mt-8 text-lg uppercase">
            Beauty Magazine Feature
          </div>
          <div className="mt-4 line-clamp-3 text-lg text-gray-600">
            SHAO's innovative approach to sustainable beauty has caught the
            attention of industry leaders, highlighting our commitment to
            natural ingredients and eco-friendly practices.
          </div>
        </article>

        {/* Article 2 */}
        <article className="block rounded-sm">
          <img
            src="/side1.webp"
            alt="Sustainable Beauty Awards 2024"
            className="mb-2 h-[450px] w-full rounded object-cover"
          />
          <div className="font-neue-montreal-mono mt-8 text-lg uppercase">
            Sustainability Award Winner
          </div>
          <div className="mt-4 line-clamp-3 text-lg text-gray-600">
            Recognized at the 2024 Sustainable Beauty Awards for our
            groundbreaking bio-fermentation technology and commitment to
            environmental responsibility in cosmetics.
          </div>
        </article>

        {/* Article 3 */}
        <article className="block rounded-sm">
          <img
            src="/hero-1.webp"
            alt="Botanical Innovation in Skincare"
            className="mb-2 h-[450px] w-full rounded object-cover"
          />
          <div className="font-neue-montreal-mono mt-8 text-lg uppercase">
            Innovation Spotlight
          </div>
          <div className="mt-4 line-clamp-3 text-lg text-gray-600">
            Featured in Tech Beauty Review for our unique blend of traditional
            botanical wisdom with cutting-edge biotechnology, setting new
            standards in natural skincare.
          </div>
        </article>
      </div>
    </section>
  );
}
