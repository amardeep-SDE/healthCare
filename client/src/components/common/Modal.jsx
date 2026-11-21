// src/components/common/Modal.jsx
import React, { memo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

export const Modal = memo(({ isOpen, onClose, title, children, maxWidth = "max-w-2xl" }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className={`relative w-full ${maxWidth} bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-10 my-4 sm:my-8`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <IoClose size={22} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 max-h-[78vh] sm:max-h-[80vh] overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

Modal.displayName = "Modal";

