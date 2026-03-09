import { useChatStore } from "../store/useChatStore";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";

const ChatPage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen flex flex-col bg-[#0f171e] text-slate-300">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 flex flex-col bg-[#121b24]">
          {!selectedUser ? (
            <NoChatSelected />
          ) : (
            <ChatContainer />
          )}
        </main>
      </div>
    </div>
  );
};

export default ChatPage;
