import { Router } from "express";
import { signup } from "../controllers/auth.controller.js";
import { login } from "../controllers/auth.controller.js";
import { getUserInfo } from "../controllers/auth.controller.js";
import { updateProfile } from "../controllers/auth.controller.js";
import { updateProfileImage } from "../controllers/auth.controller.js";
import { deleteProfileImage } from "../controllers/auth.controller.js";
import { logout } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import multer from "multer";

const authRoutes = Router();

const upload = multer({ dest: "uploads/profiles" });

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/user_info", verifyToken, getUserInfo);
authRoutes.post("/update_profile", verifyToken, updateProfile);
authRoutes.post(
  "/update_profile_image",
  verifyToken,
  upload.single("profileimage"),
  updateProfileImage
);
authRoutes.delete("/delete_profile_image", verifyToken, deleteProfileImage);
authRoutes.post("/logout", verifyToken, logout);


export default authRoutes;
