// src/views/auth/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiShield } from "react-icons/fi";
import { FaUserMd, FaUser } from "react-icons/fa";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("ananya.sharma@example.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { login, switchRole } = useAuthStore();

  const validate = () => {
    const err = {};
    if (!email) err.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) err.email = "Enter a valid email";

    if (!password) err.password = "Password is required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 600));

      const isDoctorLogin =
        email.toLowerCase().includes("rashi") || email.toLowerCase().includes("doctor");

      if (isDoctorLogin) {
        switchRole("doctor");
        toast.success("Welcome, Dr. Rashi! Accessing Clinic Control.");
        navigate("/doctor/dashboard");
      } else {
        switchRole("patient");
        toast.success("Welcome back, Ananya! Accessing Patient Portal.");
        navigate("/patient/dashboard");
      }
    } catch (err) {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (role) => {
    switchRole(role);
    if (role === "doctor") {
      toast.success("Logged in as Dr. Rashi (Super Admin)");
      navigate("/doctor/dashboard");
    } else {
      toast.success("Logged in as Patient (Ananya)");
      navigate("/patient/dashboard");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,_#eef2ff,_#ffffff_70%)] dark:bg-[radial-gradient(circle_at_top,_#1e1b4b,_#0f172a_70%)] px-4 py-12">
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/50 dark:border-gray-700">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-950/60 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-2xl mx-auto mb-3 shadow-inner">
            <FiShield />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Sign in to Dr. Rashi's Clinic & Patient Care Portal
          </p>
        </div>

        {/* 1-Click Quick Demo Sign-in Pills */}
        <div className="mb-6 p-3 rounded-2xl bg-indigo-50/70 dark:bg-gray-700/40 border border-indigo-100 dark:border-gray-600 space-y-2">
          <span className="text-[11px] font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider block text-center">
            ⚡ Quick Demo Logins
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo("doctor")}
              className="py-2 px-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition hover:scale-105"
            >
              <FaUserMd /> Doctor Admin
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo("patient")}
              className="py-2 px-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition hover:scale-105"
            >
              <FaUser /> Patient Login
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full mt-1 px-4 py-2.5 rounded-xl border ${
                errors.email ? "border-red-400" : "border-gray-200 dark:border-gray-700"
              } bg-white dark:bg-gray-900 text-sm dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border ${
                  errors.password ? "border-red-400" : "border-gray-200 dark:border-gray-700"
                } bg-white dark:bg-gray-900 text-sm dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-95 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In to Clinic"}
          </button>
        </form>

        <div className="flex justify-between text-xs mt-6 text-gray-500 dark:text-gray-400">
          <span>New Patient?</span>
          <Link to="/register" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
            Register Account
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
