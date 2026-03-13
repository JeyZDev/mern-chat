import React, { useState, useEffect } from "react";
import { Camera, Mail, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const [fullName, setFullName] = useState(authUser?.fullName || "");

  useEffect(() => {
    if (authUser) {
      setFullName(authUser.fullName || "");
    }
  }, [authUser]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      return toast.error("File size is too large (max 2MB)");
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  if (!authUser)
    return (
      <div className="min-h-screen bg-[#0f171e] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-orange-400"></span>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0f171e] text-slate-300 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 py-10">
        <div className="w-full max-w-2xl bg-[#121b24] rounded-3xl p-8 border border-slate-800 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Profile</h1>
            <p className="text-slate-500 mt-1">Your profile information</p>
          </div>

          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className={`w-32 h-32 rounded-full object-cover border-4 border-slate-700 ${isUpdatingProfile ? "animate-pulse opacity-50" : ""}`}
              />
              <label
                className={`absolute bottom-0 right-0 p-2 bg-slate-600 rounded-full cursor-pointer hover:bg-slate-500 transition-all
                ${isUpdatingProfile ? "pointer-events-none opacity-50" : ""}`}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-xs text-slate-500">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5 text-left">
              <div className="flex items-center gap-2 text-slate-400 text-sm ml-1">
                <User size={16} /> Full Name
              </div>
              <input
                className="w-full p-3 bg-[#1a232e] border border-slate-700 rounded-xl text-white font-medium"
                name="fullName"
                id="fullName"
                value={fullName}
                disabled={isUpdatingProfile}
                onChange={(e) => setFullName(e.target.value)}
                onBlur={(e) => {
                  if (e.target.value !== authUser.fullName) {
                    updateProfile({ fullName: e.target.value });
                  }
                }}
              />
            </div>

            <div className="space-y-1.5 text-left">
              <div className="flex items-center gap-2 text-slate-400 text-sm ml-1">
                <Mail size={16} /> Email Address
              </div>
              <div className="w-full p-3 bg-[#1a232e] border border-slate-700 rounded-xl text-white font-medium opacity-70 cursor-not-allowed">
                {authUser.email}
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-800">
            <h3 className="text-lg font-medium text-white mb-4 text-left">
              Account Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm py-2 border-b border-slate-800/50">
                <span className="text-slate-400">Member Since</span>
                <span className="text-white font-mono">
                  {authUser.createdAt?.split("T")[0] || "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Account Status</span>
                <span className="text-green-500 font-medium animate-pulse">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
