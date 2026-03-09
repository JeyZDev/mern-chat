import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { UserCircle } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  return (
    <div className="p-2.5 border-b border-slate-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            {selectedUser.profilePic ? (
              <img
                src={selectedUser.profilePic}
                alt={selectedUser.fullName}
                className="size-10 rounded-full object-cover border border-slate-700"
              />
            ) : (
              <div className="size-10 rounded-full border border-slate-700 bg-slate-800 flex items-center justify-center">
                <UserCircle className="w-6 h-6 text-slate-600" />
              </div>
            )}
            {onlineUsers.includes(selectedUser._id) && (
              <span className="absolute bottom-0 right-0 size-2.5 bg-green-500 ring-2 ring-[#0f171e] rounded-full" />
            )}
          </div>

          <div>
            <h3 className="font-medium text-white">{selectedUser.fullName}</h3>
            <p className="text-xs text-slate-500">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <button
          onClick={() => setSelectedUser(null)}
          className="text-slate-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
