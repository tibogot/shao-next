"use client";
import { useState, useEffect } from "react";
import SmoothInfiniteScroll from "../../components/SmoothInfiniteScroll";
import { fetchAllProducts } from "../../lib/shopify";

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [vendor, setVendor] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [vendors, setVendors] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch all products to get unique vendors
  useEffect(() => {
    fetchAllProducts(100) // Fetch more to get a good vendor list
      .then((data) => {
        const uniqueVendors = Array.from(
          new Set(data.edges.map((edge: any) => edge.node.vendor)),
        ).sort() as string[];
        setVendors(uniqueVendors);
      })
      .catch((error) => {
        console.error("Failed to fetch vendors:", error);
      });
  }, []);

  const clearFilters = () => {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setVendor("all");
    setAvailability("all");
    setSortBy("default");
  };

  return (
    <div className="mx-auto px-4 py-8 md:px-8">
      <div className="mb-8">
        <h1 className="font-neue-montreal-mono mb-4 text-3xl uppercase">
          Shop
        </h1>
        <p className="text-gray-600">
          Discover our complete collection of sustainable beauty products
        </p>
      </div>

      {/* Filter Toggle Button - Mobile */}
      <div className="mb-6 md:hidden">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex w-full items-center justify-between rounded border bg-white px-4 py-2 text-left"
        >
          <span>Filters</span>
          <span>{showFilters ? "−" : "+"}</span>
        </button>
      </div>

      {/* Filters Section */}
      <div className={`mb-6 ${showFilters ? "block" : "hidden"} md:block`}>
        <div className="rounded-lg bg-gray-50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-neue-montreal-mono text-lg uppercase">
              Filters
            </h3>
            <button
              onClick={clearFilters}
              className="text-sm text-gray-600 underline hover:text-black"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Search */}
            <div>
              <label className="font-neue-montreal-mono block text-sm font-medium uppercase">
                Search
              </label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mt-1 w-full rounded border px-3 py-2"
                placeholder="Product name or description..."
              />
            </div>

            {/* Vendor Filter */}
            <div>
              <label className="font-neue-montreal-mono block text-sm font-medium uppercase">
                Vendor
              </label>
              <select
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                className="mt-1 w-full rounded border px-3 py-2"
              >
                <option value="all">All Vendors</option>
                {vendors.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability Filter */}
            <div>
              <label className="font-neue-montreal-mono block text-sm font-medium uppercase">
                Availability
              </label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="mt-1 w-full rounded border px-3 py-2"
              >
                <option value="all">All Products</option>
                <option value="available">In Stock</option>
                <option value="unavailable">Out of Stock</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="font-neue-montreal-mono block text-sm font-medium uppercase">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="mt-1 w-full rounded border px-3 py-2"
              >
                <option value="default">Default</option>
                <option value="name-a-z">Name A-Z</option>
                <option value="name-z-a">Name Z-A</option>
                <option value="price-low-high">Price Low to High</option>
                <option value="price-high-low">Price High to Low</option>
              </select>
            </div>
          </div>

          {/* Price Range */}
          <div className="mt-4">
            <label className="font-neue-montreal-mono block text-sm font-medium uppercase">
              Price Range
            </label>
            <div className="mt-1 flex gap-2">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full rounded border px-3 py-2"
                placeholder="Min (€)"
                min="0"
              />
              <span className="flex items-center px-2">to</span>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full rounded border px-3 py-2"
                placeholder="Max (€)"
                min="0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <SmoothInfiniteScroll
        search={search}
        minPrice={minPrice}
        maxPrice={maxPrice}
        vendor={vendor}
        availability={availability}
        sortBy={sortBy}
      />
    </div>
  );
}
