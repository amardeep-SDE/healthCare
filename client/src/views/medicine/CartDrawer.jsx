// src/views/medicine/CartDrawer.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiCheckCircle } from "react-icons/fi";
import { useCartStore } from "../../store/useCartStore";
import { formatCurrency } from "../../utils/formatters";
import toast from "react-hot-toast";

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQty,
    getCartTotal,
    placeOrder,
  } = useCartStore();

  const [address, setAddress] = useState(
    "Flat 402, Green Valley Apts, Kolar Road, Bhopal, MP - 462042"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = getCartTotal();

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    if (!address.trim()) {
      toast.error("Please enter a delivery address");
      return;
    }

    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 800));

    const order = placeOrder({
      totalAmount: total,
      deliveryAddress: address,
      paymentMethod: "UPI (Paid)",
    });

    setIsSubmitting(false);
    toast.success(`Order Placed! Order ID: ${order.id}`, { icon: "📦" });
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-white dark:bg-gray-900 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiShoppingBag className="text-xl text-indigo-600" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Homeopathy Dispensary Cart ({cart.length})
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <FiShoppingBag className="text-4xl text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-gray-500">Your cart is currently empty.</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover border border-gray-200 dark:border-gray-700"
                      />
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1">
                          {item.name}
                        </h4>
                        <span className="text-[11px] text-gray-500 block">{item.category}</span>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">
                            {formatCurrency(item.price)}
                          </span>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateCartQty(item.id, -1)}
                              className="w-6 h-6 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs"
                            >
                              <FiMinus />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQty(item.id, 1)}
                              className="w-6 h-6 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs"
                            >
                              <FiPlus />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-2 text-rose-500 hover:text-rose-700 text-xs"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Checkout Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-gray-100 dark:border-gray-800 space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                      Delivery Address
                    </label>
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter flat / house no, street, city, pin code..."
                      className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-white dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-gray-500">
                      <span>Medicines Subtotal:</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Clinic Packaging & Shipping:</span>
                      <span className="text-emerald-600 font-semibold">FREE</span>
                    </div>
                    <div className="flex justify-between text-base font-black text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
                      <span>Total Amount:</span>
                      <span className="text-indigo-600 dark:text-indigo-400">
                        {formatCurrency(total)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-indigo-600 text-white font-bold text-sm shadow-xl shadow-indigo-600/20 hover:scale-[1.02] active:scale-95 transition disabled:opacity-50"
                  >
                    {isSubmitting ? "Processing..." : `Pay ${formatCurrency(total)} & Order`}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

