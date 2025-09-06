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

      {/* Responsive layout: Horizontal scroll on mobile, grid on desktop */}
      <div className="mt-8 grid grid-flow-col gap-4 overflow-x-auto pb-4 md:grid-flow-row md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-4">
        {loading ? (
          // Show 4 skeleton items
          Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="w-[280px] flex-shrink-0 md:w-auto md:flex-shrink"
            >
              <ProductSkeleton />
            </div>
          ))
        ) : products.length > 0 ? (
          // Show actual products
          products.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.handle}`}
              className="block min-h-[450px] w-[280px] flex-shrink-0 md:w-auto md:flex-shrink"
            >
              <Image
                src={p.images.edges[0]?.node.url}
                alt={p.title}
                width={400}
                height={450}
                className="mb-2 h-[350px] w-full rounded-sm object-cover md:h-[450px] md:rounded-none"
                sizes="(max-width: 768px) 280px, (max-width: 1024px) 50vw, 25vw"
                loading="lazy"
              />
              <div className="font-neue-montreal-mono mt-4 text-sm uppercase md:mt-8">
                {p.title}
              </div>
              <div className="mb-2 line-clamp-2 text-sm text-gray-600 md:mt-4 md:line-clamp-3">
                {p.description}
              </div>
              <div className="font-neue-montreal-mono mb-2 text-sm text-gray-800 uppercase">
                {formatEuroPrice(p.priceRange.minVariantPrice.amount)}
              </div>
            </Link>
          ))
        ) : (
          // Error state
          <div className="col-span-full flex min-h-[450px] w-full items-center justify-center py-4 text-center">
            No products found. Check console for details.
          </div>
        )}
      </div>
    </section>
  );
}
