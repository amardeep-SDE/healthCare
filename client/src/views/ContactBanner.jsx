// src/views/ContactBanner.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiPhoneCall,
  FiMail,
  FiMapPin,
  FiClock,
  FiCalendar,
  FiSend,
  FiCheckCircle,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import toast from "react-hot-toast";

const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Please enter your name and phone number");
      return;
    }
    setSubmitted(true);
    toast.success("Thank you! Dr. Rashi's clinic reception will contact you shortly.");
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28 px-4 sm:px-8 md:px-16 lg:px-24 bg-gradient-to-b from-white via-indigo-50/40 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 transition-colors duration-300 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-700 dark:text-indigo-300">
            Clinic Connect & Assistance
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Visit Our Clinic or{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Consult from Anywhere
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            Reach out directly for appointment inquiries, follow-up dosage guidance, or medical report reviews.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Direct Clinic Cards & Map (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Quick Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Phone / WhatsApp */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-gray-200/80 dark:border-slate-700 shadow-sm space-y-3">
                <div className="p-3 w-fit rounded-2xl bg-indigo-50 dark:bg-slate-900 text-indigo-600 dark:text-indigo-400">
                  <FiPhoneCall size={22} />
                </div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Call Reception</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Mon - Sat: 10:00 AM - 07:00 PM</p>
                <a
                  href="tel:+919876543210"
                  className="block text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  +91 98765 43210
                </a>
              </div>

              {/* Direct WhatsApp */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-gray-200/80 dark:border-slate-700 shadow-sm space-y-3">
                <div className="p-3 w-fit rounded-2xl bg-emerald-50 dark:bg-slate-900 text-emerald-600 dark:text-emerald-400">
                  <FaWhatsapp size={22} />
                </div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Instant WhatsApp</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Case queries & prescription refills</p>
                <a
                  href="https://wa.me/919876543210?text=Hello%20Dr.%20Rashi,%20I%20would%20like%20to%20inquire%20about%20a%20homeopathy%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Chat on WhatsApp →
                </a>
              </div>

              {/* Physical Clinic Address */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-gray-200/80 dark:border-slate-700 shadow-sm space-y-3 sm:col-span-2">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shrink-0">
                    <FiMapPin size={22} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">Clinic Address</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mt-1">
                      Dr. Rashi Homeopathic Healing Clinic, 2nd Floor, Healthcare Arcade, Near 56 Dukan, New Palasia, Indore, MP - 452001
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">
                      (Also holding periodic outstation clinics in Kolar Road, Bhopal MP)
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Embedded Location Map */}
            <div className="w-full h-56 rounded-3xl overflow-hidden border border-gray-200/80 dark:border-slate-700 shadow-md">
              <iframe
                title="clinic-location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.3478260599365!2d75.86769307508866!3d22.754998179351095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd065d3a09d3%3A0xf7d9a2c0c51a6a35!2sNew%20Palasia%2C%20Indore%2C%20Madhya%20Pradesh%20452001!5e0!3m2!1sen!2sin!4v1720079595559!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

          {/* Right Column: Callback Request Form & Instant Consultation Card (5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-slate-800/90 border border-gray-200/80 dark:border-slate-700 p-8 shadow-xl flex flex-col justify-between space-y-6">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
                <FiCalendar /> Request Free Callback
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Have Questions Before Booking?
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Leave your details below and our clinic reception will call you back within 2 business hours to explain treatment duration and slot availability.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +91 98234 56789"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Health Concern / Symptoms (Optional)
                </label>
                <textarea
                  rows="3"
                  placeholder="Briefly describe your skin, gastric, or hair concerns..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-none transition"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition hover:scale-[1.01]"
              >
                <FiSend /> Request Callback
              </button>
            </form>

            {/* Direct Booking Highlight Link */}
            <div className="pt-4 border-t border-gray-100 dark:border-slate-700/60 text-center">
              <span className="text-xs text-gray-500 dark:text-gray-400 block mb-2">
                Ready to consult Dr. Rashi directly?
              </span>
              <Link
                to="/appointment"
                className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Book Confirmed Consultation Slot (₹500) →
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
