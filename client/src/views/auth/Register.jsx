// src/views/auth/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiUserPlus, FiPhone } from "react-icons/fi";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuthStore();

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Full name is required";
    if (!form.email.trim()) err.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) err.email = "Enter a valid email";
    if (!form.phone.trim()) err.phone = "Phone number is required";
    if (!form.password) err.password = "Password is required";
    else if (form.password.length < 6) err.password = "Minimum 6 characters required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 800));

      const newUser = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        role: "patient",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      };

      login(newUser);
      toast.success("Registration complete! Welcome to Dr. Rashi's Clinic 🎉");
      navigate("/patient/dashboard");
    } catch (err) {
      toast.error("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,_#eef2ff,_#ffffff_70%)] dark:bg-[radial-gradient(circle_at_top,_#1e1b4b,_#0f172a_70%)] px-4 py-12">
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/50 dark:border-gray-700">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-950/60 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-2xl mx-auto mb-3 shadow-inner">
            <FiUserPlus />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Patient Registration
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Create an account to book consultations & track treatment
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Ananya Sharma"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={`w-full mt-1 px-4 py-2.5 rounded-xl border ${
                errors.name ? "border-red-400" : "border-gray-200 dark:border-gray-700"
              } bg-white dark:bg-gray-900 text-sm dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              placeholder="ananya@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={`w-full mt-1 px-4 py-2.5 rounded-xl border ${
                errors.email ? "border-red-400" : "border-gray-200 dark:border-gray-700"
              } bg-white dark:bg-gray-900 text-sm dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              WhatsApp Phone Number
            </label>
            <input
              type="tel"
              placeholder="+91 98765 11223"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={`w-full mt-1 px-4 py-2.5 rounded-xl border ${
                errors.phone ? "border-red-400" : "border-gray-200 dark:border-gray-700"
              } bg-white dark:bg-gray-900 text-sm dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Choose secure password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
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
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-95 transition disabled:opacity-50 mt-2"
          >
            {loading ? "Creating Account..." : "Create Patient Account"}
          </button>
        </form>

        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
