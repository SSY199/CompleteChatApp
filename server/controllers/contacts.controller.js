import User from "../models/user.model.js";

export const getContacts = async (req, res) => {
  try {
    const { searchTerm } = req.body;

    if (!searchTerm) {
      // If no search term is provided, return all users except the current user
      const contacts = await User.find({ _id: { $ne: req.userId } });
      return res.status(200).json({ contacts });
    }

    const sanitizedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escape special characters
    const regex = new RegExp(sanitizedSearchTerm, "i"); // Case-insensitive search

    console.log("Search Term:", searchTerm);
    console.log("Regex:", regex);

    const contacts = await User.find({
      $and: [
        { _id: { $ne: req.userId } }, // Exclude the current user
        {
          $or: [
            { firstname: regex }, // Use "firstname" instead of "firstName"
            { lastname: regex },  // Use "lastname" instead of "lastName"
            { email: regex },
          ],
        },
      ],
    });

    console.log("Contacts Found:", contacts);

    return res.status(200).json({ contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
