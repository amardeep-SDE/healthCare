import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect with backend
    console.log(form);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,_#eef2ff,_#ffffff_70%)] px-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-8">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Create Account 🩺
          </h2>
          <p className="text-gray-500 mt-2">
            Book appointments and track your health
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              required
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Patient Name"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="patient@email.com"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
