"use client";
import { useState } from "react";
import SmoothInfiniteScroll from "../../components/SmoothInfiniteScroll";

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  return (
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

      {/* Smooth Infinite Scroll Component */}
      <SmoothInfiniteScroll
        search={search}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
    </div>
  );
}
