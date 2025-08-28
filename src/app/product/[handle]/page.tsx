"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProductByHandle } from "../../../lib/shopify";
import { useCartStore } from "../../../store/cartStore";

interface Product {
  id: string;
  title: string;
  descriptionHtml: string;
  images: { edges: { node: { url: string } }[] };
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
}

export default function ProductPage() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((s) => s.addToCart);
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    if (!handle) return;
    setLoading(true);
    fetchProductByHandle(handle).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [handle]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!product) return <div className="p-8">Product not found.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex-1">
          {product.images.edges.length > 0 && (
            <img
              src={product.images.edges[0].node.url}
              alt={product.title}
              className="mb-4 h-80 w-full rounded object-cover"
            />
          )}
          <div className="flex gap-2">
            {product.images.edges.slice(1).map((img, i) => (
              <img
                key={i}
                src={img.node.url}
                alt={product.title}
                className="h-20 w-20 rounded border object-cover"
              />
            ))}
          </div>
        </div>
        <div className="flex-1">
          <h1 className="mb-2 text-3xl font-bold">{product.title}</h1>
          <div className="mb-4 text-xl text-gray-700">
            {product.priceRange.minVariantPrice.amount}{" "}
            {product.priceRange.minVariantPrice.currencyCode}
          </div>
          <div
            className="mb-6"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
          <button
            onClick={() => {
              addToCart({
                id: product.id,
                title: product.title,
                price: parseFloat(product.priceRange.minVariantPrice.amount),
                image: product.images.edges[0]?.node.url || "",
                quantity: 1,
              });
              openCart();
            }}
            className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
