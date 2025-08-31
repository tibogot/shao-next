"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchProductsByVendor } from "../lib/shopify";
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
    <div className="block min-h-[450px] animate-pulse rounded-sm">
      <div className="mb-2 h-[450px] w-full rounded bg-gray-200"></div>
      <div className="mt-8 mb-2 h-5 w-3/4 rounded bg-gray-200"></div>
      <div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
      <div className="h-4 w-1/2 rounded bg-gray-200"></div>
    </div>
  );
}

export default function HydrogenProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Refresh ScrollTrigger when loading state changes
  useScrollTriggerRefresh([loading, products.length]);

  useEffect(() => {
    console.log("HydrogenProducts: Starting to fetch products...");
    setLoading(true);
    fetchProductsByVendor("Hydrogen Vendor", 4)
      .then((data) => {
        console.log("HydrogenProducts: Received data:", data);
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("HydrogenProducts: Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  return (
    <section className="px-4 py-8 md:px-8">
      <h2 className="font-neue-montreal-mono text-sm text-black/60 uppercase">
        Hydrogen Collection
      </h2>

      {/* Always show the grid with consistent height */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          // Show 4 skeleton items with exact same dimensions
          Array.from({ length: 4 }).map((_, index) => (
            <ProductSkeleton key={`skeleton-${index}`} />
          ))
        ) : products.length > 0 ? (
          // Show actual products with same dimensions
          products.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.handle}`}
              className="block min-h-[450px] rounded-sm"
            >
              <Image
                src={p.images.edges[0]?.node.url}
                alt={p.title}
                width={400}
                height={450}
                className="mb-2 h-[450px] w-full rounded object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
                loading="lazy"
                style={{ height: "auto" }}
              />
              <div className="font-neue-montreal-mono mt-8 text-sm uppercase">
                {p.title}
              </div>
              <div className="mt-4 line-clamp-3 text-sm text-gray-600">
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
            No Hydrogen products found. Check console for details.
          </div>
        )}
      </div>
    </section>
  );
}
