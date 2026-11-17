// src/views/doctor/DoctorOrdersManagement.jsx
import React, { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiSearch,
  FiMapPin,
  FiArrowRight,
} from "react-icons/fi";
import { FaPills, FaShippingFast } from "react-icons/fa";
import { useDoctorOrdersQuery, useUpdateOrderStatusMutation } from "../../hooks/useAppointmentsQuery";
import { useDebounce } from "../../hooks/useDebounce";
import { Badge } from "../../components/common/Badge";
import { formatCurrency } from "../../utils/formatters";

export const DoctorOrdersManagement = () => {
  const { data: orders = [], isLoading } = useDoctorOrdersQuery();
  const updateStatusMutation = useUpdateOrderStatusMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [filterStatus, setFilterStatus] = useState("All");

  const handleStatusChange = useCallback(
    (id, status) => {
      updateStatusMutation.mutate({ id, status });
    },
    [updateStatusMutation]
  );

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesStatus =
        filterStatus === "All" || o.status.toLowerCase() === filterStatus.toLowerCase();

      const query = debouncedSearch.toLowerCase();
      const matchesSearch =
        !debouncedSearch ||
        o.id.toLowerCase().includes(query) ||
        o.trackingId?.toLowerCase().includes(query) ||
        o.deliveryAddress?.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [orders, filterStatus, debouncedSearch]);

  return (
    <div className="min-h-screen bg-gray-50/70 dark:bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-700 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-3">
              <FaPills /> Dispensary Orders & Fulfillment Center
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold">
              Medicine Orders & Logistics Management
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200 mt-2 max-w-xl">
              Track custom homeopathic formulations, pack clinic remedies, generate courier tracking numbers, and update delivery status for patient orders.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <span className="text-xs text-indigo-200 block font-semibold">Active Orders</span>
            <span className="text-3xl font-black text-white">{orders.length}</span>
            <span className="text-[11px] text-emerald-300 block">Fulfillment Queue</span>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            {["All", "Dispensed", "In Transit", "Delivered"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  filterStatus === st
                    ? "bg-indigo-600 text-white shadow"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search by Order ID or Tracking AWB..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Orders List */}
        {isLoading ? (
          <div className="min-h-[250px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center border border-gray-100 dark:border-gray-700">
            <p className="text-gray-500 font-semibold">No dispensary orders found matching this filter.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-700 gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
                        {ord.id}
                      </span>
                      <Badge status={ord.status} />
                      <span className="text-xs px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold">
                        {ord.paymentStatus} via {ord.paymentMethod}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 block mt-1">
                      Ordered on {ord.date} • Courier AWB: <strong className="font-mono">{ord.trackingId}</strong>
                    </span>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs text-gray-400 block">Total Amount</span>
                    <span className="text-xl font-black text-gray-900 dark:text-white">
                      {formatCurrency(ord.totalAmount)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-gray-400 font-bold uppercase tracking-wider block mb-1">
                      Items to Pack & Dispense:
                    </span>
                    <div className="space-y-1">
                      {ord.items?.map((item, i) => (
                        <div key={i} className="flex justify-between font-medium text-gray-800 dark:text-gray-200">
                          <span>{item.name}</span>
                          <span className="text-indigo-600 font-bold">Qty: {item.quantity || 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/40 p-3 rounded-xl border border-gray-100 dark:border-gray-600">
                    <span className="text-gray-400 font-bold uppercase tracking-wider block mb-1 flex items-center gap-1">
                      <FiMapPin /> Shipping Address:
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">{ord.deliveryAddress}</p>
                  </div>
                </div>

                {/* Status Change Controls for Super Admin Doctor */}
                <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-gray-500">
                    Update Dispatch Workflow:
                  </span>

                  <div className="flex items-center gap-2">
                    {ord.status !== "Dispensed" && (
                      <button
                        onClick={() => handleStatusChange(ord.id, "Dispensed")}
                        className="px-3 py-1.5 rounded-lg border border-amber-300 text-amber-700 dark:text-amber-300 text-xs font-bold hover:bg-amber-50"
                      >
                        Mark Dispensed
                      </button>
                    )}
                    {ord.status !== "In Transit" && (
                      <button
                        onClick={() => handleStatusChange(ord.id, "In Transit")}
                        className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold shadow hover:bg-blue-700"
                      >
                        Ship via Courier
                      </button>
                    )}
                    {ord.status !== "Delivered" && (
                      <button
                        onClick={() => handleStatusChange(ord.id, "Delivered")}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold shadow hover:bg-emerald-700"
                      >
                        ✓ Mark Delivered
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorOrdersManagement;

