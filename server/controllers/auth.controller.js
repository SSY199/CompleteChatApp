import User from "../models/user.model.js";
import pkg from "jsonwebtoken";
import { compare } from "bcrypt";
import { unlinkSync, renameSync } from "fs";
const { sign } = pkg;


const createToken = (email, userId) => {
  return sign({ email, userId }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields." });
    }
    const user = await User.create({ email, password });
    res.cookie("jwt", createToken(email, user._id), {
      secure: true,
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      sameSite: "None",
    });
    return res.status(201).json({
      user: {
        email: user.email,
        id: user._id,
        profileSetup: user.profileSetup,
        // firstName: user.firstname,
        // lastName: user.lastname,
        // image: user.image,
        // color: user.color,
        // profileSetup: user.profileSetup,
      },
    });
    //const token = createToken(user._id);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email." });
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

    res.cookie("jwt", createToken(email, user._id), {
      secure: true,
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      sameSite: "None",
    });
    return res.status(200).json({
      user: {
        email: user.email,
        id: user._id,
        profileSetup: user.profileSetup,
        firstName: user.firstname,
        lastName: user.lastname,
        image: user.image,
        color: user.color,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    //console.log(req.userId);
    const userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json({
      email: userData.email,
      id: userData._id,
      profileSetup: userData.profileSetup,
      firstName: userData.firstname,
      lastName: userData.lastname,
      image: userData.image,
      color: userData.color,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { userId } = req;
    const { firstName, lastName, color } = req.body;

    if (!firstName || !lastName) {
      return res
        .status(400)
        .json({ message: "Firstname, Lastname and color are required." });
    }

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        firstname: firstName, // Use "firstname" as per the schema
        lastname: lastName,   // Use "lastname" as per the schema
        color,
        profileSetup: true,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      email: userData.email,
      id: userData._id,
      profileSetup: userData.profileSetup,
      firstName: userData.firstname, // Return "firstname" as "firstName"
      lastName: userData.lastname,   // Return "lastname" as "lastName"
      image: userData.image,
      color: userData.color,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export const updateProfileImage = async (req, res, next) => {
  try {
    const { userId } = req;
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const imagePath = `uploads/profiles/${req.file.filename}`;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { image: imagePath },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      image: updatedUser.image,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export const deleteProfileImage = async (req, res, next) => {
  try {
    const { userId } = req;
    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found." });
    }
    if (userData.image) {
      try {
        unlinkSync(userData.image); // Ensure this path is correct
      } catch (err) {
        console.error("Error deleting file:", err);
      }
    }
    userData.image = null;
    await userData.save();
    return res.status(200).json({ message: "Image deleted successfully." });
  } catch (error) {
    console.error("Error in deleteProfileImage:", error);
    res.status(400).json({ message: error.message });
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("jwt", { secure: true, sameSite: "None" });
    return res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}
