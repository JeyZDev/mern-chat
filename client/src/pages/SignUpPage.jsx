import React, { useState } from "react";
import { Eye, EyeOff, Settings, MessageSquare, Loader2 } from "lucide-react";
import { useNavigate, Link } from "react-router";
import Swal from "sweetalert2";
import AuthService from "../services/auth.service";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {signUp, isSigningUp} = useAuthStore();

  // สร้าง State สำหรับเก็บข้อมูลจากฟอร์ม
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

    const validateForm = () => {
    if(!formData.fullName.trim()) return toast.error("Full name is required");
    if(!formData.email.trim()) return toast.error("Email is required");
    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid Email Format");
    if (!formData.password.trim()) return toast.error("Password is required");
    if(formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if(success == true) {
      await signUp(formData);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f171e] text-slate-300 flex flex-col font-sans">
      {/* Header */}
      <header className="p-4 flex justify-between items-center bg-[#0f171e]">
        <div className="flex items-center gap-2 font-semibold text-xl text-white">
          <div className="p-1.5 bg-[#1a232e] rounded-lg border border-slate-700">
            <MessageSquare className="w-5 h-5 text-orange-400" />
          </div>
          <span>SE Chat</span>
        </div>
        <button className="btn btn-ghost btn-sm gap-2 text-slate-400 normal-case hover:bg-slate-800">
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row">
        {/* Left Side: Form */}
        <div className="flex-1 flex flex-col justify-center items-center px-6 py-8">
          <div className="w-full max-w-sm space-y-6 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-[#1a232e] rounded-xl border border-slate-700">
                <MessageSquare className="w-8 h-8 text-orange-400" />
              </div>
              <h1 className="text-3xl font-bold text-white">Create Account</h1>
              <p className="text-slate-500">
                Get started with your free account
              </p>
            </div>

            <form className="space-y-4 text-left" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-slate-400">Full Name</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="input input-bordered w-full bg-[#161f2a] border-slate-700 focus:border-orange-400 focus:outline-none text-white"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>

              {/* Email */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-slate-400">Email</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="input input-bordered w-full bg-[#161f2a] border-slate-700 focus:border-orange-400 focus:outline-none text-white"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              {/* Password */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-slate-400">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="input input-bordered w-full bg-[#161f2a] border-slate-700 focus:border-orange-400 focus:outline-none pr-10 text-white"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSigningUp}
                className="btn w-full bg-[#ff8a65] hover:bg-[#ff7b52] disabled:bg-[#ff8a65]/70 disabled:cursor-not-allowed text-[#0f171e] border-none font-bold text-lg normal-case mt-4 flex items-center justify-center gap-2"
              >
                {isSigningUp && <Loader2 className="w-5 h-5 animate-spin" />}
                {isSigningUp ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="text-slate-500 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-orange-400 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side: Visuals */}
        <div className="hidden md:flex flex-1 bg-[#121b24] flex-col justify-center items-center p-12">
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="w-24 h-24 bg-[#231e20] rounded-2xl border border-slate-800 opacity-80 shadow-lg"
              />
            ))}
          </div>

          <div className="text-center max-w-sm space-y-4">
            <h2 className="text-3xl font-bold text-white">
              Join our community
            </h2>
            <p className="text-slate-400 leading-relaxed text-sm">
              Connect with friends, share moments, and stay in touch with your
              loved ones.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUpPage;
