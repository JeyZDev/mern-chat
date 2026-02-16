import React, { useEffect, useState } from "react";
import { Settings, User, LogOut, Users, MessageSquare } from "lucide-react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router";

const ChatPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // เช็ค Auth เมื่อโหลดหน้า
    const checkUser = async () => {
      try {
        const data = await AuthService.checkAuth();
        setUser(data);
      } catch (err) {
        navigate("/login");
      }
    };
    checkUser();
  }, []);

  const handleLogout = async () => {
    await AuthService.logout();
    localStorage.removeItem("chat-user");
    navigate("/login");
  };

  return (
    <div className="h-screen flex flex-col bg-[#0f171e] text-slate-300">
      <header className="h-16 border-b border-slate-800 flex items-center justify-between px-4">
        <div className="flex items-center gap-2 font-bold text-white">
          <MessageSquare className="text-orange-400" /> <span>SE Chat</span>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-ghost btn-sm gap-2">
            <Settings size={16} /> Settings
          </button>
          <button className="btn btn-ghost btn-sm gap-2">
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

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 border-r border-slate-800 p-4">
          <div className="flex items-center gap-2 mb-6 font-medium text-white">
            <Users size={20} className="text-slate-400" /> Contacts
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <input
              type="checkbox"
              className="checkbox checkbox-xs border-slate-600"
            />{" "}
            Show online only (0 online)
          </div>
          <div className="mt-20 text-center text-slate-600 text-sm italic">
            No online users
          </div>
        </aside>

        {/* Main View */}
        <main className="flex-1 flex flex-col items-center justify-center bg-[#121b24]">
          <div className="p-8 bg-[#1a232e] rounded-3xl border border-slate-800 mb-6">
            <MessageSquare size={48} className="text-orange-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Welcome to SE Chat!</h2>
          <p className="text-slate-500 mt-2">
            Select a conversation from the sidebar to start chatting
          </p>
        </main>
      </div>
    </div>
  );
};

export default ChatPage;
