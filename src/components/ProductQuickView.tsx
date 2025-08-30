"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useCartStore } from "../store/cartStore";
import Link from "next/link";

type Product = {
  id: string;
  title: string;
  handle: string;
  description: string;
  price?: number;
  images:
    | { edges?: { node: { url: string } }[]; url?: string }[]
    | { edges: { node: { url: string } }[] };
  variants?: {
    edges?: {
      node: { id: string; title: string; price: { amount: string } };
    }[];
    id?: string;
    title?: string;
    price?: { amount: string } | number;
  }[];
  priceRange?: { minVariantPrice: { amount: string } };
};

type ProductQuickViewProps = {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function ProductQuickView({
  product,
  isOpen,
  onClose,
}: ProductQuickViewProps) {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCartStore();

  if (!product) return null;

  // Handle both Shopify and demo product structures
  const getVariantPrice = (variant: any) => {
    if (typeof variant.price === "number") return variant.price;
    if (variant.price?.amount) return parseFloat(variant.price.amount);
    return 0;
  };

  const getVariantId = (variant: any) => {
    return variant.id || variant.node?.id || product.id;
  };

  const getVariantTitle = (variant: any) => {
    return variant.title || variant.node?.title || "Default";
  };

  // Get variants array (handle both Shopify edges structure and direct array)
  const variantsArray =
    product.variants?.edges?.map((edge: any) => edge.node) ||
    product.variants ||
    [];

  const selectedVariantData = variantsArray[selectedVariant] || {
    id: product.id,
    title: "Default",
    price:
      product.price ||
      (product.priceRange?.minVariantPrice?.amount
        ? parseFloat(product.priceRange.minVariantPrice.amount)
        : 0),
  };

  const selectedVariantPrice = getVariantPrice(selectedVariantData);
  const selectedVariantId = getVariantId(selectedVariantData);
  const selectedVariantTitle = getVariantTitle(selectedVariantData);

  const handleAddToCart = () => {
    const imageUrl = getProductImage(currentImageIndex);
    addToCart({
      id: selectedVariantId,
      title: product.title,
      price: selectedVariantPrice,
      image: imageUrl || "",
      quantity,
    });

    // Add to recently viewed
    if ((window as any).addToRecentlyViewed) {
      (window as any).addToRecentlyViewed({
        id: product.id,
        title: product.title,
        handle: product.handle,
        image: imageUrl || "",
        price: selectedVariantPrice,
      });
    }

    onClose();
  };

  const getProductImage = (index?: number) => {
    console.log("Product images:", product.images);
    console.log("Current index:", index);
    console.log("Product:", product);

    // Handle Shopify's actual structure: images.edges is an array of node objects
    if (product.images?.edges && Array.isArray(product.images.edges)) {
      if (index !== undefined && product.images.edges[index]) {
        return product.images.edges[index].node.url;
      }
      // Fallback to first image
      if (product.images.edges[0]) {
        return product.images.edges[0].node.url;
      }
    }

    // Handle demo product structure: images is an array of objects with url
    if (Array.isArray(product.images)) {
      if (index !== undefined && product.images[index]) {
        if (product.images[index].url) {
          return product.images[index].url;
        }
        if (product.images[index].edges?.[0]?.node?.url) {
          return product.images[index].edges[0].node.url;
        }
      }

      // Fallback to first image
      if (product.images[0]) {
        if (product.images[0].url) {
          return product.images[0].url;
        }
        if (product.images[0].edges?.[0]?.node?.url) {
          return product.images[0].edges[0].node.url;
        }
      }
    }

    // If no images found, return null instead of empty string
    return null;
  };

  const currentImageUrl = getProductImage(currentImageIndex);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Quick View</h2>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 hover:bg-gray-100"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Product Images */}
                <div className="space-y-4">
                  <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                    {currentImageUrl ? (
                      <img
                        src={currentImageUrl}
                        alt={product.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-gray-400">
                        <svg
                          className="h-16 w-16"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Navigation */}
                  {(() => {
                    // Handle both Shopify and demo image structures for thumbnails
                    let imageArray: any[] = [];

                    if (
                      product.images?.edges &&
                      Array.isArray(product.images.edges)
                    ) {
                      // Shopify structure
                      imageArray = product.images.edges;
                    } else if (Array.isArray(product.images)) {
                      // Demo structure
                      imageArray = product.images;
                    }

                    if (imageArray.length > 1) {
                      return (
                        <div className="flex gap-2 overflow-x-auto">
                          {imageArray.map((image, index) => {
                            const thumbnailUrl = getProductImage(index);
                            return (
                              <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`aspect-square w-16 flex-shrink-0 overflow-hidden rounded border-2 ${
                                  currentImageIndex === index
                                    ? "border-black"
                                    : "border-gray-200"
                                }`}
                              >
                                {thumbnailUrl ? (
                                  <img
                                    src={thumbnailUrl}
                                    alt={`${product.title} ${index + 1}`}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                                    <svg
                                      className="h-6 w-6"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                      />
                                    </svg>
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                  <div>
                    <h1 className="mb-2 text-2xl font-semibold">
                      {product.title}
                    </h1>
                    <p className="text-3xl font-bold text-gray-900">
                      €{selectedVariantPrice.toFixed(2)}
                    </p>
                  </div>

                  <div>
                    <p className="line-clamp-4 text-gray-600">
                      {product.description}
                    </p>
                  </div>

                  {/* Variant Selection */}
                  {variantsArray.length > 1 && (
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Select Option
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {variantsArray.map((variant, index) => (
                          <button
                            key={getVariantId(variant)}
                            onClick={() => setSelectedVariant(index)}
                            className={`rounded-md border px-4 py-2 text-sm transition-colors ${
                              selectedVariant === index
                                ? "border-black bg-black text-white"
                                : "border-gray-300 text-gray-700 hover:border-gray-400"
                            }`}
                          >
                            {getVariantTitle(variant)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Quantity
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="rounded-full p-1 hover:bg-gray-100"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 12H4"
                          />
                        </svg>
                      </button>
                      <span className="w-12 text-center text-sm">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="rounded-full p-1 hover:bg-gray-100"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={handleAddToCart}
                      className="w-full rounded-lg bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
                    >
                      Add to Cart - €
                      {(selectedVariantPrice * quantity).toFixed(2)}
                    </button>
                    <Link
                      href={`/product/${product.handle}`}
                      className="block w-full rounded-lg border border-gray-300 px-6 py-3 text-center text-gray-700 transition-colors hover:border-black hover:text-black"
                    >
                      View Full Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
