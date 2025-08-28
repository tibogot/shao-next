"use client";
import { useEffect, useState } from "react";
import { fetchProducts } from "../lib/shopify";
import Link from "next/link";

type Product = {
  id: string;
  title: string;
  handle: string;
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

export default function LatestProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetchProducts(4).then(setProducts);
  }, []);
  return (
    <section className="bg-green-300 px-4 py-8 md:px-8">
      <h2 className="mb-4 text-2xl font-bold">Latest Products</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/product/${p.handle}`}
            className="block min-h-[350px] rounded-sm"
          >
            <img
              src={p.images.edges[0]?.node.url}
              alt={p.title}
              className="mb-2 h-100 w-full rounded object-cover"
            />
            <div className="font-neue-montreal-mono text-lg tracking-wide uppercase">
              {p.title}
            </div>
            <div className="font-neue-montreal-mono mb-2 text-base text-gray-800 uppercase">
              {formatEuroPrice(p.priceRange.minVariantPrice.amount)}
            </div>
            {/* If you have a description, render it here: */}
            {/* <div className="font-neue-montreal text-gray-600 text-sm">{p.description}</div> */}
          </Link>
        ))}
      </div>
    </section>
  );
}
