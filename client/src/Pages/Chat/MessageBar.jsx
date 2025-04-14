import React, { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { RiEmojiStickerLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";

const MessageBar = () => {
  const [message, setMessage] = useState("");
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const emojiRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setIsEmojiPickerVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  const handleAddEmoji = (emojiObject) => {
    setMessage((msg) => msg + emojiObject.emoji);
  };
  

  const handleSendMessage = () => {
    console.log("Message sent:", message);
    setMessage("");
  };

  return (
    <div className="h-[12vh] bg-[#1c1d25] flex justify-center items-center px-6 py-4 gap-4">
      <div className="flex-1 flex bg-[#2a2b33] rounded-full items-center gap-3 pr-4 shadow-lg">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-4 bg-transparent rounded-full text-white placeholder-gray-400 focus:outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="relative">
          <button className="text-gray-400 hover:text-white transition duration-300">
            <GrAttachment size={24} />
          </button>
        </div>
        <div className="relative">
          <button
            className="text-gray-400 hover:text-white transition duration-300"
            onClick={() => setIsEmojiPickerVisible(!isEmojiPickerVisible)}
          >
            <RiEmojiStickerLine size={24} />
          </button>
          {isEmojiPickerVisible && (
            <div
              className="absolute bottom-12 right-0 shadow-lg rounded-lg"
              ref={emojiRef}
            >
              <EmojiPicker
                theme="dark"
                onEmojiClick={(emojiObject) => handleAddEmoji(emojiObject)}
                autoFocusSearch={false}
              />
            </div>
          )}
        </div>
      </div>
      <button
        className="bg-[#8417ff] p-4 rounded-full shadow-lg hover:bg-[#6e14d9] transition-all duration-300 transform hover:scale-110 focus:outline-none"
        onClick={handleSendMessage}
      >
        <IoSend size={24} className="text-white" />
      </button>
    </div>
  );
};

export default MessageBar;
