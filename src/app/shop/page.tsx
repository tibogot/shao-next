"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { fetchAllProducts } from "../../lib/shopify";
import Link from "next/link";
import Navbar from "../../components/Navbar";

interface Product {
  id: string;
  title: string;
  handle: string;
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

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [pageInfo, setPageInfo] = useState<{
    hasNextPage: boolean;
    endCursor: string | null;
  }>({ hasNextPage: false, endCursor: null });
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const pageSize = 12;

  // Fetch initial products
  useEffect(() => {
    setLoading(true);
    fetchAllProducts(pageSize).then((data) => {
      setProducts(data.edges.map((e: any) => e.node));
      setPageInfo(data.pageInfo);
      setLoading(false);
    });
  }, []);

  // Filtering
  useEffect(() => {
    let filteredList = products;
    if (search) {
      filteredList = filteredList.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase()),
      );
    }
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
    setFiltered(filteredList);
  }, [search, minPrice, maxPrice, products]);

  // Infinite scroll
  const loadMore = useCallback(async () => {
    if (!pageInfo.hasNextPage || loading) return;
    setLoading(true);
    const data = await fetchAllProducts(
      pageSize,
      pageInfo.endCursor ?? undefined,
    );
    setProducts((prev) => [...prev, ...data.edges.map((e: any) => e.node)]);
    setPageInfo(data.pageInfo);
    setLoading(false);
  }, [pageInfo, loading]);

  useEffect(() => {
    if (!observerRef.current) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loadMore, observerRef, pageInfo]);

  return (
    <>
      <Navbar variant="page" />
      <div className="mx-auto bg-green-200 px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Shop</h1>
        <div className="mb-6 flex flex-wrap items-end gap-4 px-4">
          <div>
            <label className="block text-sm font-medium">Search</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded border px-2 py-1"
              placeholder="Product title..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Min Price</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="rounded border px-2 py-1"
              placeholder="0"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Max Price</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="rounded border px-2 py-1"
              placeholder="1000"
              min="0"
            />
          </div>
        </div>
        {loading && <div className="mb-4">Loading...</div>}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.handle}`}
              className="block min-h-[350px] rounded-lg border bg-white hover:shadow-lg"
            >
              <img
                src={p.images.edges[0]?.node.url}
                alt={p.title}
                className="mb-2 h-80 w-full rounded object-cover"
              />
              <div className="font-neue-montreal-mono text-lg font-bold tracking-wide uppercase">
                {p.title}
              </div>
              <div className="font-neue-montreal-mono mb-2 text-base text-gray-800 uppercase">
                {formatEuroPrice(p.priceRange.minVariantPrice.amount)}
              </div>
            </Link>
          ))}
        </div>
        {/* Infinite scroll trigger */}
        <div ref={observerRef} className="h-8"></div>
      </div>
    </>
  );
}
