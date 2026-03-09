import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-[#0f171e]">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-orange-400/10 flex items-center justify-center animate-bounce">
              <MessageSquare className="w-8 h-8 text-orange-400" />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white">Welcome to SE Chat!</h2>
        <p className="text-slate-500">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
