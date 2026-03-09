import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./SidebarSkeleton";
import { UserCircle, Users } from "lucide-react";

const Sidebar = () => {
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const { getUsers, setSelectedUser, users, isUserLoading, selectedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUserLoading) return <SidebarSkeleton />;

  return (
    // แก้ไข: เปลี่ยน w-72 เป็น w-20 lg:w-72 เพื่อให้ยืดหยุ่นตามขนาดจอ
    <aside className="h-full w-20 lg:w-72 border-r border-slate-800 flex flex-col transition-all duration-200 bg-[#0f171e]">
      <div className="p-4 border-b border-slate-800/50 w-full">
        <div className="flex items-center gap-2 mb-4">
          <Users size={20} className="text-slate-400" />
          {/* แก้ไข: ซ่อนข้อความ Contacts ในจอเล็ก */}
          <span className="font-medium hidden lg:block text-white">
            Contacts
          </span>
        </div>

        {/* แก้ไข: ซ่อนส่วนตัวกรอง Online ในจอเล็กเพื่อไม่ให้ Layout แตก */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm border-slate-600"
            />
            <span className="text-sm text-slate-400">Show online only</span>
          </label>
          <span className="text-xs text-slate-500">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-slate-800/40 transition-colors
              ${selectedUser?._id === user._id ? "bg-slate-800 ring-1 ring-slate-700" : ""}
            `}
          >
            {/* Profile Picture / Avatar & Online Indicator */}
            <div className="relative mx-auto lg:mx-0">
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt={user.fullName}
                  className="size-12 object-cover rounded-full border border-slate-700"
                />
              ) : (
                <div className="size-12 rounded-full border border-slate-700 bg-slate-800 flex items-center justify-center">
                  <UserCircle className="w-8 h-8 text-slate-600" />
                </div>
              )}
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  ring-2 ring-[#0f171e] rounded-full"
                />
              )}
            </div>

            {/* User Info - แก้ไข: min-w-0 ช่วยป้องกัน text ล้นในจอใหญ่ */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="font-medium truncate text-white">
                {user.fullName}
              </div>
              <div className="text-xs text-slate-500">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-slate-500 py-10 text-sm italic hidden lg:block">
            No users found
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
