import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAppStore } from "@/store/store.js";
import { HOST } from "@/utils/constants.js";

const socketContext = createContext(null);

export const useSocket = () => {
  const context = useContext(socketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  //const [socketReady, setSocketReady] = useState(false);
  const { userInfo } = useAppStore();

  useEffect(() => {
    if (userInfo && userInfo.id) { // Ensure userInfo.id exists
      console.log("Connecting socket with userId:", userInfo.id); // Debug log
      socketRef.current = io(HOST, {
        transports: ["websocket"],
        auth: { userId: userInfo.id }, // Pass only the id
        withCredentials: true,
      });
  
      socketRef.current.on("connect", () => {
        console.log("Socket connected:", socketRef.current.id);
      });

      const handleReceiveMessage = (message) => {
  console.log("Received message:", message);
  const { selectedChatData, selectedChatType, addMessage } = useAppStore.getState();

  const senderId = message.sender?.id || message.sender?._id;
  const receiverId = message.receiver?.id || message.receiver?._id;

  if (
    selectedChatType !== undefined &&
    (selectedChatData?.id === senderId || selectedChatData?.id === receiverId)
  ) {
    console.log("Adding message to chat:", message);
    addMessage(message);
  }
};


      socketRef.current.on("receiveMessage", handleReceiveMessage);
  
      return () => {
        socketRef.current.disconnect();
        console.log("Socket disconnected");
      };
    }
  }, [userInfo]);

  return (
    <socketContext.Provider value={socketRef.current}>
      {children}
    </socketContext.Provider>
  );
};