import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validate = () => {
    const err = {};
    if (!email) err.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      err.email = "Enter a valid email";

    if (!password) err.password = "Password is required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      // 🔗 API call later
      await new Promise((res) => setTimeout(res, 1200));

      localStorage.setItem("token", "dummy-token");

      toast.success("Login successful 🎉");
      navigate("/patient/dashboard");
    } catch (err) {
      // 🔥 API ERROR → TOAST
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,_#eef2ff,_#ffffff_70%)] px-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl">

        <h2 className="text-3xl font-extrabold text-center mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Login to manage your appointments
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full mt-1 px-4 py-3 rounded-xl border ${
                errors.email ? "border-red-400" : "border-gray-200"
              } focus:ring-2 focus:ring-indigo-500 outline-none`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.password ? "border-red-400" : "border-gray-200"
                } focus:ring-2 focus:ring-indigo-500 outline-none`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold flex justify-center"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="flex justify-between text-sm mt-6">
          <Link to="/forgot-password" className="text-indigo-600">
            Forgot password?
          </Link>
          <Link to="/register" className="text-indigo-600 font-medium">
            Sign up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
