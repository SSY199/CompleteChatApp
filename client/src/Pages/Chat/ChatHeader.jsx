import { Button } from "@/components/ui/button";
import React from "react";
import { RiCloseFill } from "react-icons/ri";
const ChatHeader = () => {
  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between">
      <div className="flex gap-5 items-center">
        <div className="flex gap-3 items-center justify-center"></div>
        <div className="flex items-center justify-center gap-5">
          <Button
            variant="ghost"
            className="text-[#8b8c9a] hover:text-[#ffffff] hover:bg-[#2f303b] rounded-full p-2 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
          >
            <RiCloseFill
              size={22}
              className="transition-transform duration-300 hover:scale-110"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
