"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { fetchAllProducts } from "../lib/shopify";
import { useScrollTriggerRefresh } from "../hooks/useScrollTriggerRefresh";
import Link from "next/link";

interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  vendor: string;
  availableForSale: boolean;
  images: { edges: { node: { url: string } }[] };
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
}

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

// Enhanced Product Skeleton with smooth animation
function ProductSkeleton({ delay = 0 }: { delay?: number }) {
  return (
    <div className="block min-h-[450px] animate-pulse rounded-sm">
      <div className="mb-2 h-[450px] w-full rounded bg-gray-200"></div>
      <div className="mt-8 mb-2 h-5 w-3/4 rounded bg-gray-200"></div>
      <div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
      <div className="h-4 w-1/2 rounded bg-gray-200"></div>
    </div>
  );
}

// Enhanced Product Component with smooth entrance
function ProductCard({
  product,
  delay = 0,
}: {
  product: Product;
  delay?: number;
}) {
  return (
    <Link
      href={`/product/${product.handle}`}
      className="block min-h-[450px] rounded-sm"
    >
      <img
        src={product.images.edges[0]?.node.url}
        alt={product.title}
        className="mb-2 h-[450px] w-full rounded object-cover"
        loading="lazy"
      />
      <div className="font-neue-montreal-mono mt-8 text-lg uppercase">
        {product.title}
      </div>
      <div className="mt-4 line-clamp-3 text-lg text-gray-600">
        {product.description}
      </div>
      <div className="font-neue-montreal-mono mb-2 text-base text-gray-800 uppercase">
        {formatEuroPrice(product.priceRange.minVariantPrice.amount)}
      </div>
    </Link>
  );
}

interface SmoothInfiniteScrollProps {
  search: string;
  minPrice: string;
  maxPrice: string;
  vendor: string;
  availability: string;
  sortBy: string;
}

export default function SmoothInfiniteScroll({
  search,
  minPrice,
  maxPrice,
  vendor,
  availability,
  sortBy,
}: SmoothInfiniteScrollProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [pageInfo, setPageInfo] = useState<{
    hasNextPage: boolean;
    endCursor: string | null;
  }>({ hasNextPage: false, endCursor: null });
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const pageSize = 12;
  const bufferSize = 24; // Load more items in advance

  // Refresh ScrollTrigger when content changes
  useScrollTriggerRefresh([products.length, filtered.length]);

  // Smooth loading with buffer approach
  const loadMore = useCallback(async () => {
    if (!pageInfo.hasNextPage || loadingMore) return;

    setLoadingMore(true);

    try {
      const data = await fetchAllProducts(
        bufferSize, // Load more at once for smoother experience
        pageInfo.endCursor ?? undefined,
      );

      // Smooth state updates using RAF
      requestAnimationFrame(() => {
        setProducts((prev) => [...prev, ...data.edges.map((e: any) => e.node)]);
        setPageInfo(data.pageInfo);

        // Gradually reveal items for smooth appearance
        setTimeout(() => {
          setLoadingMore(false);
        }, 200);
      });
    } catch (err) {
      console.error("Failed to load more products:", err);
      setLoadingMore(false);
    }
  }, [pageInfo.hasNextPage, pageInfo.endCursor, loadingMore]);

  // Initial load
  useEffect(() => {
    setInitialLoading(true);
    fetchAllProducts(bufferSize)
      .then((data) => {
        if (data.edges.length === 0 && !data.pageInfo.hasNextPage) {
          setError("No products available.");
        } else {
          setProducts(data.edges.map((e: any) => e.node));
          setPageInfo(data.pageInfo);
        }
        setInitialLoading(false);
      })
      .catch((err) => {
        setError("Failed to load products.");
        setInitialLoading(false);
      });
  }, []);

  // Filtering with smooth transitions
  useEffect(() => {
    let filteredList = products;

    // Search filter
    if (search) {
      filteredList = filteredList.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Price filters
    if (minPrice) {
      filteredList = filteredList.filter(
        (p) =>
          parseFloat(p.priceRange.minVariantPrice.amount) >=
          parseFloat(minPrice),
      );
    }
    if (maxPrice) {
      filteredList = filteredList.filter(
        (p) =>
          parseFloat(p.priceRange.minVariantPrice.amount) <=
          parseFloat(maxPrice),
      );
    }

    // Vendor filter
    if (vendor && vendor !== "all") {
      filteredList = filteredList.filter(
        (p) => p.vendor.toLowerCase() === vendor.toLowerCase(),
      );
    }

    // Availability filter
    if (availability === "available") {
      filteredList = filteredList.filter((p) => p.availableForSale);
    } else if (availability === "unavailable") {
      filteredList = filteredList.filter((p) => !p.availableForSale);
    }

    // Sorting
    if (sortBy === "price-low-high") {
      filteredList.sort(
        (a, b) =>
          parseFloat(a.priceRange.minVariantPrice.amount) -
          parseFloat(b.priceRange.minVariantPrice.amount),
      );
    } else if (sortBy === "price-high-low") {
      filteredList.sort(
        (a, b) =>
          parseFloat(b.priceRange.minVariantPrice.amount) -
          parseFloat(a.priceRange.minVariantPrice.amount),
      );
    } else if (sortBy === "name-a-z") {
      filteredList.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "name-z-a") {
      filteredList.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFiltered(filteredList);
    setVisibleCount(Math.min(12, filteredList.length)); // Reset visible count
  }, [search, minPrice, maxPrice, vendor, availability, sortBy, products]);

  // Smooth reveal of more items
  const revealMore = useCallback(() => {
    if (visibleCount < filtered.length) {
      setVisibleCount((prev) => Math.min(prev + 6, filtered.length));
    } else if (pageInfo.hasNextPage && !loadingMore) {
      loadMore();
    }
  }, [
    visibleCount,
    filtered.length,
    pageInfo.hasNextPage,
    loadingMore,
    loadMore,
  ]);

  // Intersection Observer for smooth loading
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          revealMore();
        }
      },
      {
        rootMargin: "200px",
        threshold: 0.1,
      },
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [revealMore]);

  if (initialLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: pageSize }).map((_, index) => (
          <ProductSkeleton
            key={`skeleton-initial-${index}`}
            delay={index * 50}
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-full flex min-h-[450px] items-center justify-center py-4 text-center">
        <div>
          <p className="mb-4 text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded bg-black px-4 py-2 text-white hover:bg-black/80"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const visibleProducts = filtered.slice(0, visibleCount);
  const hasMoreToReveal = visibleCount < filtered.length;
  const needsApiLoad = !hasMoreToReveal && pageInfo.hasNextPage;

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {visibleProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            delay={index < 12 ? 0 : (index - 12) * 30} // Stagger new items
          />
        ))}

        {/* Show skeletons for upcoming content */}
        {(hasMoreToReveal || needsApiLoad) &&
          Array.from({
            length: Math.min(6, hasMoreToReveal ? 6 : pageSize),
          }).map((_, index) => (
            <ProductSkeleton
              key={`skeleton-more-${index}`}
              delay={index * 50}
            />
          ))}
      </div>

      {/* Smooth trigger element */}
      <div className="mt-12 flex justify-center">
        <div ref={observerRef} className="h-2 w-2">
          {loadingMore && (
            <div className="flex items-center justify-center py-8">
              <div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-black"></div>
              <span className="ml-3 text-sm text-gray-600">
                Loading more products...
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
