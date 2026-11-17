// src/store/useCartStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { INITIAL_ORDERS } from "../data/homeopathyData";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      orders: INITIAL_ORDERS,
      isCartOpen: false,

      setIsCartOpen: (open) => set({ isCartOpen: open }),

      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existing = state.cart.find((item) => item.id === product.id);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
              isCartOpen: true,
            };
          }
          return {
            cart: [...state.cart, { ...product, quantity }],
            isCartOpen: true,
          };
        });
      },

      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        }));
      },

      updateCartQty: (productId, delta) => {
        set((state) => ({
          cart: state.cart
            .map((item) => {
              if (item.id === productId) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
              }
              return item;
            })
            .filter(Boolean),
        }));
      },

      clearCart: () => set({ cart: [] }),

      placeOrder: (orderDetails) => {
        const state = get();
        const items = state.cart.length > 0 ? state.cart : orderDetails.items || [];
        const newOrder = {
          id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
          date: new Date().toISOString().split("T")[0],
          items,
          totalAmount: orderDetails.totalAmount,
          shippingFee: 0,
          paymentMethod: orderDetails.paymentMethod || "UPI (Google Pay)",
          paymentStatus: "Paid",
          status: "Dispensed", // 'Order Placed' -> 'Dispensed' -> 'In Transit' -> 'Delivered'
          trackingId: `DRR-EXP-${Math.floor(100000 + Math.random() * 900000)}`,
          deliveryAddress: orderDetails.deliveryAddress,
          estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
        };

        set({
          orders: [newOrder, ...state.orders],
          cart: [],
          isCartOpen: false,
        });

        return newOrder;
      },

      updateOrderStatus: (orderId, newStatus) => {
        set((state) => ({
          orders: state.orders.map((ord) =>
            ord.id === orderId ? { ...ord, status: newStatus } : ord
          ),
        }));
      },

      // Computed totals
      getCartTotal: () => {
        return get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getCartCount: () => {
        return get().cart.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: "hp-cart-storage",
    }
  )
);

