import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  Settings,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { useNavigate, Link } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { logIn, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await logIn(formData);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#0f171e] text-slate-300 flex flex-col font-sans">
      <header className="p-4 flex justify-between items-center bg-[#0f171e]">
        <div className="flex items-center gap-2 font-semibold text-xl text-white">
          <div className="p-1.5 bg-[#1a232e] rounded-lg border border-slate-700">
            <MessageSquare className="w-5 h-5 text-orange-400" />
          </div>
          <span>SE Chat</span>
        </div>
        <button className="btn btn-ghost btn-sm gap-2 text-slate-400 normal-case hover:bg-slate-800">
          <Settings className="w-4 h-4" /> Settings
        </button>
      </header>

      <main className="flex-1 flex flex-col md:flex-row">
        <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">
          <div className="w-full max-w-sm space-y-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="p-3 bg-[#1a232e] rounded-xl border border-slate-700">
                <MessageSquare className="w-8 h-8 text-orange-400" />
              </div>
              <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
              <p className="text-slate-500">Sign in to your account</p>
            </div>

            <form className="space-y-6 text-left" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-slate-400">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full bg-[#161f2a] border-slate-700 focus:border-orange-400 text-white"
                  placeholder="you@example.com"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-slate-400">Password</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className="input input-bordered w-full bg-[#161f2a] border-slate-700 focus:border-orange-400 text-white"
                    placeholder="••••••••"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-slate-500"
                  >
                    <Eye size={18} />
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="btn w-full bg-[#ff8a65] hover:bg-[#ff7b52] disabled:bg-[#ff8a65]/70 disabled:cursor-not-allowed text-[#0f171e] border-none font-bold text-lg normal-case mt-4 flex items-center justify-center gap-2"
              >
                {isLoggingIn && <Loader2 className="w-5 h-5 animate-spin" />}
                {isLoggingIn ? "Logging in Account..." : "Logging in Account"}
              </button>
            </form>

            <p className="text-slate-500 text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-orange-400 hover:underline">
                Create account
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side Background (Visible on MD+) */}
        <div className="hidden md:flex flex-1 bg-[#121b24] flex-col justify-center items-center p-12">
          <div className="grid grid-cols-3 gap-4 mb-12">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="w-24 h-24 bg-[#231e20] rounded-2xl border border-slate-800"
              />
            ))}
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome back!</h2>
          <p className="text-slate-400 text-center max-w-xs">
            Sign in to continue your conversations and catch up with your
            messages.
          </p>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
