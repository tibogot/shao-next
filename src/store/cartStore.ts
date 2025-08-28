import { create } from "zustand";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addToCart: (item) =>
    set((state) => {
      const exists = state.items.find((i) => i.id === item.id);
      if (exists) {
        return {
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i,
          ),
          isCartOpen: true,
        };
      }
      return { items: [...state.items, item], isCartOpen: true };
    }),
  removeFromCart: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  clearCart: () => set({ items: [] }),
  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
}));
