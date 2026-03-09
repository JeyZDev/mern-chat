import React from "react";

const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[#0f171e]">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}
        >
          <div
            className={`flex flex-col max-w-[80%] ${idx % 2 === 0 ? "items-start" : "items-end"}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="h-3 w-12 bg-slate-800 rounded animate-pulse" />
            </div>

            <div
              className={`rounded-2xl p-4 w-40 md:w-64 h-12 animate-pulse ${
                idx % 2 === 0
                  ? "bg-[#1a232e] rounded-tl-none border border-slate-800"
                  : "bg-slate-800 rounded-tr-none"
              }`}
            >
              <div className="h-2 w-full bg-slate-700/50 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
