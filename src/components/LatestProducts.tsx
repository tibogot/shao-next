"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchProducts } from "../lib/shopify";
import { useScrollTriggerRefresh } from "../hooks/useScrollTriggerRefresh";
import Link from "next/link";

type Product = {
  id: string;
  title: string;
  handle: string;
  description: string;
  vendor: string;
  availableForSale: boolean;
  images: { edges: { node: { url: string } }[] };
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
};

function formatEuroPrice(amount: string) {
  return (
    "€" +
    Number(amount)
      .toLocaleString("fr-FR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      .replace(".", ",")
  );
}

// Skeleton component for consistent sizing
function ProductSkeleton() {
  return (
    <div className="block min-h-[450px] animate-pulse">
      <div className="mb-2 h-[450px] w-full bg-gray-200"></div>
      <div className="mt-8 mb-2 h-5 w-3/4 bg-gray-200"></div>
      <div className="mb-2 h-4 w-full bg-gray-200"></div>
      <div className="h-4 w-1/2 bg-gray-200"></div>
    </div>
  );
}

export default function LatestProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Refresh ScrollTrigger when loading state changes
  useScrollTriggerRefresh([loading, products.length]);

  useEffect(() => {
    console.log("LatestProducts: Starting to fetch products...");
    setLoading(true);
    fetchProducts(4)
      .then((data) => {
        console.log("LatestProducts: Received data:", data);
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("LatestProducts: Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  return (
    <section className="px-4 py-8 md:px-8">
      <h2 className="font-neue-montreal-mono text-sm text-black/60 uppercase">
        Latest Products
      </h2>

      {/* Mobile: Horizontal scroll carousel */}
      <div className="mt-8 md:hidden">
        <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4">
          {loading ? (
            // Show 4 skeleton items for mobile carousel
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`mobile-skeleton-${index}`}
                className="w-[280px] flex-shrink-0"
              >
                <ProductSkeleton />
              </div>
            ))
          ) : products.length > 0 ? (
            // Show actual products in mobile carousel
            products.map((p) => (
              <Link
                key={`mobile-${p.id}`}
                href={`/product/${p.handle}`}
                className="block min-h-[450px] w-[280px] flex-shrink-0"
              >
                <Image
                  src={p.images.edges[0]?.node.url}
                  alt={p.title}
                  width={280}
                  height={350}
                  className="mb-2 h-[350px] w-full rounded-sm object-cover"
                  sizes="280px"
                  loading="lazy"
                />
                <div className="font-neue-montreal-mono mt-4 text-sm uppercase">
                  {p.title}
                </div>
                <div className="font-neue-montreal mb-2 line-clamp-2 text-sm text-gray-600">
                  {p.description}
                </div>
                <div className="font-neue-montreal-mono mb-2 text-sm text-gray-800 uppercase">
                  {formatEuroPrice(p.priceRange.minVariantPrice.amount)}
                </div>
              </Link>
            ))
          ) : (
            // Error state for mobile
            <div className="flex min-h-[450px] w-full items-center justify-center py-4 text-center">
              No products found. Check console for details.
            </div>
          )}
        </div>
      </div>

      {/* Desktop: Grid layout */}
      <div className="mt-8 hidden grid-cols-1 gap-6 md:grid md:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          // Show 4 skeleton items with exact same dimensions
          Array.from({ length: 4 }).map((_, index) => (
            <ProductSkeleton key={`desktop-skeleton-${index}`} />
          ))
        ) : products.length > 0 ? (
          // Show actual products with same dimensions
          products.map((p) => (
            <Link
              key={`desktop-${p.id}`}
              href={`/product/${p.handle}`}
              className="block min-h-[450px]"
            >
              <Image
                src={p.images.edges[0]?.node.url}
                alt={p.title}
                width={400}
                height={450}
                className="mb-2 h-[450px] w-full object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
                loading="lazy"
                style={{ height: "auto" }}
              />
              <div className="font-neue-montreal-mono mt-8 text-sm uppercase">
                {p.title}
              </div>
              <div className="font-neue-montreal mb-2 line-clamp-3 text-sm text-gray-600">
                {p.description}
              </div>
              <div className="font-neue-montreal-mono mb-2 text-sm text-gray-800 uppercase">
                {formatEuroPrice(p.priceRange.minVariantPrice.amount)}
              </div>
            </Link>
          ))
        ) : (
          // Error state with same height
          <div className="col-span-full flex min-h-[450px] items-center justify-center py-4 text-center">
            No products found. Check console for details.
          </div>
        )}
      </div>
    </section>
  );
}
