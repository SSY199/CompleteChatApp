//import React from 'react'
import { useAppStore } from "@/store/store.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ContactContainer from "./Chat/ContactContainer";
import EmptyContainer from "./Chat/EmptyContainer";
import ChatContainer from "./Chat/chatcontainer";

const Chat = () => {
  const { userInfo, selectedChatType } = useAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please setup your profile to continue...");
      navigate("/profile");
    }
  }, [userInfo, navigate]);
  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
      <ContactContainer />
      {selectedChatType === undefined ? <EmptyContainer /> : <ChatContainer />}
    </div>
  );
};

export default Chat;
