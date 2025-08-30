"use client";
import { useState, useEffect } from "react";
import SmoothInfiniteScroll from "../../components/SmoothInfiniteScroll";
import SearchAndFilter from "../../components/SearchAndFilter";
import RecentlyViewed from "../../components/RecentlyViewed";
import ProductQuickView from "../../components/ProductQuickView";
import { fetchAllProducts } from "../../lib/shopify";

type FilterState = {
  search: string;
  category: string;
  priceRange: [number, number];
  sortBy: string;
  vendor: string;
};

export default function ShopPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    priceRange: [0, 500],
    sortBy: "newest",
    vendor: "",
  });

  const [vendors, setVendors] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(500);
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Fetch all products to get unique vendors, categories, and max price
  useEffect(() => {
    fetchAllProducts(100)
      .then((data) => {
        const products = data.edges.map((edge: any) => edge.node);

        // Extract unique vendors
        const uniqueVendors = Array.from(
          new Set(products.map((product: any) => product.vendor)),
        )
          .filter(Boolean)
          .sort() as string[];
        setVendors(uniqueVendors);

        // Extract unique categories (product types)
        const uniqueCategories = Array.from(
          new Set(products.map((product: any) => product.productType)),
        )
          .filter(Boolean)
          .sort() as string[];
        setCategories(uniqueCategories);

        // Find max price
        const prices = products.map((product: any) =>
          parseFloat(product.priceRange?.minVariantPrice?.amount || "0"),
        );
        const maxProductPrice = Math.max(...prices, 0);
        setMaxPrice(Math.ceil(maxProductPrice));
        setFilters((prev) => ({
          ...prev,
          priceRange: [0, Math.ceil(maxProductPrice)],
        }));
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });
  }, []);

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    console.log("Filters changed:", newFilters);
  };

  const handleQuickView = (product: any) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
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

      {/* Advanced Search & Filtering */}
      <SearchAndFilter
        onFiltersChange={handleFiltersChange}
        categories={categories}
        vendors={vendors}
        maxPrice={maxPrice}
      />

      {/* Products Grid with Enhanced Features */}
      <SmoothInfiniteScroll
        search={filters.search}
        minPrice={filters.priceRange[0].toString()}
        maxPrice={filters.priceRange[1].toString()}
        vendor={filters.vendor}
        availability="all"
        sortBy={filters.sortBy}
        onQuickView={handleQuickView}
      />

      {/* Recently Viewed Products */}
      <RecentlyViewed />

      {/* Product Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </div>
  );
}
