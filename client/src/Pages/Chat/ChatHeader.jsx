import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/store";
import React from "react";
import { RiCloseFill } from "react-icons/ri";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { HOST } from "@/utils/constants.js";

const ChatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType } = useAppStore();

  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between">
      <div className="flex gap-5 items-center w-full justify-between px-5">
        <div className="flex gap-3 items-center justify-center">
          <div className="w-12 h-12 md:w-16 md:h-16 relative">
            <Avatar className="h-12 w-12 rounded-full overflow-hidden mt-2">
              {selectedChatData.image ? (
                <AvatarImage
                  src={`${HOST}/${selectedChatData.image}`}
                  alt="profile"
                  className="object-cover h-full w-full bg-black"
                  aria-label="User Profile Image"
                />
              ) : (
                <div
                  className={`uppercase h-full w-full font-bold text-lg border flex items-center justify-center rounded-full ${getColor(
                    selectedChatData.color
                  )}`}
                  aria-label="User Initial"
                >
                  {selectedChatData.firstname?.charAt(0) ||
                    selectedChatData.email?.charAt(0)}
                </div>
              )}
            </Avatar>
          </div>
          <div className="">
            {selectedChatType === "contact" && selectedChatData.firstname
              ? `${selectedChatData.firstname} ${selectedChatData.lastname}`
              : selectedChatData.email}
          </div>
        </div>
        <div className="flex items-center justify-center gap-5">
          <Button
            variant="ghost"
            className="text-[#8b8c9a] hover:text-[#ffffff] hover:bg-[#2f303b] rounded-full p-2 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
            onClick={closeChat}
          >
            <RiCloseFill
              size={22}
              className="cursor-pointer text-white hover:text-red-500 transition-transform duration-300"
              // Call closeChat here
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
