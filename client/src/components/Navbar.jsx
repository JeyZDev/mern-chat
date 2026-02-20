import { LogOut, MessageSquare, Settings, User } from 'lucide-react';
import React from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router';

const Navbar = () => {
    const { logOut } = useAuthStore();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logOut();
        navigate("/login");
    };

    const handleProfile = () => {
        navigate("/profile")
    }

  return (
    <header className="h-16 border-b border-slate-800 flex items-center justify-between px-4">
      <div className="flex items-center gap-2 font-bold text-white">
        <MessageSquare className="text-orange-400" /> <span>SE Chat</span>
      </div>
      <div className="flex gap-2">
        <button className="btn btn-ghost btn-sm gap-2">
          <Settings size={16} /> Settings
        </button>
        <button className="btn btn-ghost btn-sm gap-2" onClick={handleProfile}>
          <User size={16} /> Profile
        </button>
        <button
          onClick={handleLogout}
          className="btn btn-ghost btn-sm gap-2 text-red-400"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar