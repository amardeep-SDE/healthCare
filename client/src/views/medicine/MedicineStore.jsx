// src/views/medicine/MedicineStore.jsx
import React, { useState, useMemo, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiShoppingCart,
  FiCheck,
  FiStar,
  FiShield,
  FiPackage,
  FiArrowRight,
} from "react-icons/fi";
import { FaPills } from "react-icons/fa";
import { useMedicinesQuery } from "../../hooks/useAppointmentsQuery";
import { useDebounce } from "../../hooks/useDebounce";
import { useCartStore } from "../../store/useCartStore";
import { CartDrawer } from "./CartDrawer";
import { formatCurrency } from "../../utils/formatters";
import toast from "react-hot-toast";

// Memoized Product Card
const ProductCard = memo(({ product, onAddToCart }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div className="relative overflow-hidden rounded-2xl mb-4 bg-gray-50 dark:bg-gray-700/50 aspect-video flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 dark:bg-gray-900/90 text-indigo-700 dark:text-indigo-300 shadow-sm">
            {product.tag}
          </span>
        </div>

        <div className="flex items-center gap-1 text-amber-500 text-xs mb-1">
          <FiStar className="fill-amber-400 text-amber-400" />
          <span className="font-bold text-gray-800 dark:text-gray-200">{product.rating}</span>
          <span className="text-gray-400">({product.reviews})</span>
        </div>

        <h3 className="font-bold text-gray-900 dark:text-white text-base line-clamp-1">
          {product.name}
        </h3>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
          {product.description}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <div>
          <span className="text-xs text-gray-400 line-through mr-1.5">
            {formatCurrency(product.originalPrice)}
          </span>
          <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">
            {formatCurrency(product.price)}
          </span>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition hover:scale-105 active:scale-95"
        >
          <FiShoppingCart /> Add to Cart
        </button>
      </div>
    </div>
  );
});
ProductCard.displayName = "ProductCard";

export const MedicineStore = () => {
  const { data: medicines = [], isLoading } = useMedicinesQuery();
  const { addToCart, setIsCartOpen, getCartCount } = useCartStore();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);

  const categories = useMemo(() => {
    return ["All", "Care Kits", "Topical Creams", "Dilutions", "Syrups & Tonics", "Clinic Supplies"];
  }, []);

  const handleAddToCart = useCallback(
    (product) => {
      addToCart(product);
      toast.success(`${product.name} added to cart!`);
    },
    [addToCart]
  );

  // Memoized Filtered List
  const filteredProducts = useMemo(() => {
    return medicines.filter((med) => {
      const matchesCategory =
        selectedCategory === "All" || med.category === selectedCategory;

      const matchesSearch =
        !debouncedSearch ||
        med.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        med.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        med.tag.toLowerCase().includes(debouncedSearch.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [medicines, selectedCategory, debouncedSearch]);

  const cartCount = getCartCount();

  return (
    <div className="min-h-screen bg-gray-50/70 dark:bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-600 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-3">
              <FaPills /> Dr. Rashi's Authentic Homeopathy Dispensary
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold">
              Pure Remedies & Doctor-Formulated Care Kits
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100 mt-2 max-w-xl">
              Pharmaceutical grade dilutions, biocombinations, and customized remedies shipped directly from our clinic dispensary to your doorstep.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-indigo-700 hover:bg-indigo-50 font-bold text-sm shadow-xl transition hover:scale-105"
            >
              <FiShoppingCart className="text-lg" />
              <span>View Cart ({cartCount})</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-black">
                  {cartCount}
                </span>
              )}
            </button>
            <Link
              to="/orders"
              className="px-5 py-3.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-sm font-semibold border border-white/30 transition"
            >
              Track Orders
            </Link>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search remedies, kits, dilutions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="min-h-[300px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center border border-gray-100 dark:border-gray-700">
            <p className="text-gray-500">No remedies found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      <CartDrawer />
    </div>
  );
};

export default MedicineStore;

