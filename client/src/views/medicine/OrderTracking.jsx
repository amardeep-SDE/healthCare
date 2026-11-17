// src/views/medicine/OrderTracking.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiArrowRight,
  FiShoppingCart,
} from "react-icons/fi";
import { useCartStore } from "../../store/useCartStore";
import { formatCurrency } from "../../utils/formatters";
import { Badge } from "../../components/common/Badge";

export const OrderTracking = () => {
  const { orders } = useCartStore();

  const steps = [
    { title: "Order Placed", desc: "Payment received & verified" },
    { title: "Clinic Dispensary Dispensed", desc: "Remedies blended & packed" },
    { title: "In Transit", desc: "Handed over to BlueDart Courier" },
    { title: "Delivered", desc: "Package reached your address" },
  ];

  const getStepIndex = (status) => {
    switch (status?.toLowerCase()) {
      case "order placed":
        return 0;
      case "dispensed":
        return 1;
      case "in transit":
        return 2;
      case "delivered":
        return 3;
      default:
        return 1;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/70 dark:bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              Dispensary Orders & Tracking
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Track the dispatch and delivery status of your prescribed medicines.
            </p>
          </div>

          <Link
            to="/medicines"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-indigo-600/30 transition hover:scale-105"
          >
            <FiShoppingCart /> Browse Dispensary
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center border border-gray-100 dark:border-gray-700">
            <FiPackage className="text-4xl text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">
              No Orders Placed Yet
            </h3>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              You haven't ordered any remedies yet. Visit the dispensary or check your doctor's prescriptions to order.
            </p>
            <Link
              to="/medicines"
              className="inline-block mt-4 px-6 py-2.5 rounded-full bg-indigo-600 text-white text-xs font-semibold"
            >
              Order Remedies
            </Link>
          </div>
        ) : (
          orders.map((ord) => {
            const currentStep = getStepIndex(ord.status);

            return (
              <div
                key={ord.id}
                className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700 shadow-sm space-y-6"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-700 gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
                        {ord.id}
                      </span>
                      <Badge status={ord.status} />
                    </div>
                    <span className="text-xs text-gray-400 block mt-0.5">
                      Ordered on {ord.date} • Paid via {ord.paymentMethod}
                    </span>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs text-gray-400 block">Total Amount</span>
                    <span className="text-lg font-black text-gray-900 dark:text-white">
                      {formatCurrency(ord.totalAmount)}
                    </span>
                  </div>
                </div>

                {/* 4-Step Visual Tracker */}
                <div className="py-2">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative">
                    {steps.map((st, sIdx) => {
                      const isPast = sIdx <= currentStep;
                      const isCurrent = sIdx === currentStep;

                      return (
                        <div key={sIdx} className="flex flex-col items-center text-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-all ${
                              isPast
                                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-400"
                            } ${isCurrent ? "ring-4 ring-emerald-100 dark:ring-emerald-950/60" : ""}`}
                          >
                            {isPast ? "✓" : sIdx + 1}
                          </div>
                          <span className="text-xs font-bold text-gray-800 dark:text-gray-200 block">
                            {st.title}
                          </span>
                          <span className="text-[10px] text-gray-400 block mt-0.5">
                            {st.desc}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Tracking & Address Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-700/40 p-4 rounded-2xl text-xs border border-gray-100 dark:border-gray-600">
                  <div>
                    <span className="text-gray-400 uppercase tracking-wider block font-bold mb-1">
                      Tracking Details
                    </span>
                    <p className="text-gray-800 dark:text-gray-200">
                      <strong>Tracking AWB:</strong> {ord.trackingId}
                    </p>
                    <p className="text-gray-800 dark:text-gray-200 mt-0.5">
                      <strong>Est. Delivery:</strong> {ord.estimatedDelivery}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400 uppercase tracking-wider block font-bold mb-1 flex items-center gap-1">
                      <FiMapPin /> Delivery Address
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">{ord.deliveryAddress}</p>
                  </div>
                </div>

                {/* Ordered Items Summary */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Package Items
                  </h4>
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {ord.items.map((item, i) => (
                      <div key={i} className="py-2 flex justify-between items-center text-xs">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          {item.name} × {item.quantity || item.qty || 1}
                        </span>
                        <span className="font-bold text-indigo-600 dark:text-indigo-400">
                          {formatCurrency(item.price * (item.quantity || item.qty || 1))}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default OrderTracking;

