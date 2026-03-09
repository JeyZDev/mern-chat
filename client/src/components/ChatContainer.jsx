import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore';
import MessageSkeleton from './MessageSkeleton';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import { UserCircle } from 'lucide-react';

const ChatContainer = () => {
  const { messages, getMessage, isMessageLoading, selectedUser } =
    useChatStore();
  const { authUser } = useAuthStore();
  const messageRef = useRef(null);

  useEffect(() => {
    getMessage(selectedUser._id);
  }, [getMessage, selectedUser]);

  useEffect(() => {
    if (messageRef.current && messages) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessageLoading)
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <div className="flex-1 p-4 space-y-4">
          <MessageSkeleton />
        </div>
        <MessageInput />
      </div>
    );

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-[#0f171e]">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const senderId = message.sender;
          const myId = authUser._id;

          const isMine = senderId === myId;

          console.log(message);

          return (
            <div
              key={message._id}
              className={`chat ${isMine ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border border-slate-700 bg-slate-800 flex items-center justify-center overflow-hidden">
                  {isMine ? (
                    authUser.profilePic ? (
                      <img
                        src={authUser.profilePic}
                        alt="me"
                        className="size-full object-cover"
                      />
                    ) : (
                      <UserCircle className="w-6 h-6 text-slate-600" />
                    )
                  ) : selectedUser.profilePic ? (
                    <img
                      src={selectedUser.profilePic}
                      alt="user"
                      className="size-full object-cover"
                    />
                  ) : (
                    <UserCircle className="w-6 h-6 text-slate-600" />
                  )}
                </div>
              </div>

              <div className="chat-header mb-1">
                <time className="text-[10px] opacity-50 ml-1">
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>

              <div
                className={`chat-bubble flex flex-col gap-2 ${
                  isMine
                    ? "bg-slate-800 text-white"
                    : "bg-[#1a232e] text-slate-200 border border-slate-800"
                }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          );
        })}
        <div ref={messageRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;