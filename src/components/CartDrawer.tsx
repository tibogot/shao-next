"use client";
import { useCartStore } from "../store/cartStore";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function CartDrawer() {
  const { items, isCartOpen, closeCart, removeFromCart, clearCart } =
    useCartStore();
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const drawerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  // Handle mount/unmount for animation
  useEffect(() => {
    if (isCartOpen) {
      setVisible(true);
      // Wait for next animation frame to trigger the slide-in
      requestAnimationFrame(() => setShouldShow(true));
    } else if (visible) {
      setShouldShow(false);
      // Wait for animation before unmounting
      const timeout = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isCartOpen]);

  // Focus trap for accessibility (optional)
  useEffect(() => {
    if (isCartOpen && drawerRef.current) {
      drawerRef.current.focus();
    }
  }, [isCartOpen]);

  if (!visible && !isCartOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/30"
      onClick={closeCart}
    >
      <div
        ref={drawerRef}
        tabIndex={-1}
        className={`flex h-full w-full max-w-md flex-col bg-white shadow-lg transition-transform duration-300 ease-in-out ${shouldShow ? "translate-x-0" : "translate-x-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={closeCart} className="cursor-pointer text-2xl">
            &times;
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-gray-600">Your cart is empty.</div>
          ) : (
            <>
              <button
                onClick={clearCart}
                className="mb-4 cursor-pointer rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Clear Cart
              </button>
              <ul>
                {items.map((item) => (
                  <li key={item.id} className="mb-4 flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-12 w-12 rounded object-cover"
                    />
                    <div className="flex-1">
                      <Link
                        href={`/product/${item.id}`}
                        className="cursor-pointer font-semibold hover:underline"
                      >
                        {item.title}
                      </Link>
                      <div>
                        {item.quantity} × {item.price.toFixed(2)} ={" "}
                        {(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="cursor-pointer rounded bg-red-400 px-2 py-1 text-white hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="flex items-center justify-between border-t p-4">
          <div className="text-lg font-bold">Total: {total.toFixed(2)}</div>
          <Link
            href="/cart"
            className="cursor-pointer rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            onClick={closeCart}
          >
            Go to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
