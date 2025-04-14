import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store/store";
import { HOST } from "@/utils/constants";
import { getColor } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import { toast } from "sonner";
import apiclient from "@/lib/apiclient.js";
import { LOGOUT_ROUTE } from "@/utils/constants.js";

//import { Navigate } from "react-router-dom";

const ProfileInfo = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await apiclient.post(LOGOUT_ROUTE, {}, { withCredentials: true });
      if (res.status === 200) {
        setUserInfo(null); // Clear the userInfo state
        navigate("/auth"); // Redirect to the login page
        toast.success("Logged out successfully");
      } else {
        toast.error("Error logging out");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred while logging out");
    }
  };

  const avatarText = userInfo.firstName?.charAt(0) || userInfo.email?.charAt(0);

  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]">
      <div className="flex gap-3 items-center justify-center">
        <div className="w-12 h-12 md:w-16 md:h-16 relative">
          <Avatar className="h-12 w-12 rounded-full overflow-hidden mt-2">
            {userInfo.image ? (
              <AvatarImage
              src={`${HOST}/${userInfo.image}`} // Ensure this uses the updated userInfo
              alt="profile"
              className="object-cover h-full w-full bg-black"
              aria-label="User Profile Image"
            />
            ) : (
              <div
                className={`uppercase h-full w-full font-bold text-lg border flex items-center justify-center rounded-full ${getColor(
                  userInfo.color
                )}`}
                aria-label="User Initial"
              >
                {avatarText}
              </div>
            )}
          </Avatar>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-white font-semibold text-lg">
            {userInfo.firstName || userInfo.email}
          </span>
          <span className="text-gray-400 text-sm">Online</span>
        </div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FaEdit className="text-white text-2xl cursor-pointer hover:text-purple-500 transition duration-300" onClick={() => navigate('/profile')} />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm text-white">Edit Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IoLogOut className="text-white text-2xl cursor-pointer hover:text-red-500 transition duration-300" onClick={handleLogout} />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm text-white">Logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProfileInfo;
