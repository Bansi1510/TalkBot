import React, { useState } from "react";
import bg from "../../assets/authBg.png";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "react-toastify/dist/ReactToastify.css";
import { loginAPI } from "../../../APIs/auth.api";


const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await loginAPI(email, password);
    setLoading(false)

  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-sm px-4">
        <div className="bg-black/70 border border-white/20 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-white mb-6">
            Welcome Back
          </h2>

          <form className="space-y-4 text-sm" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-md bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 rounded-md bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 rounded-md text-white font-medium transition ${loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
                }`}
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>

          <p className="text-xs text-center text-gray-300 mt-4">
            Don’t have an account?{" "}
            <span
              className="underline cursor-pointer text-white"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>


    </div>
  );
};

export default Login;
