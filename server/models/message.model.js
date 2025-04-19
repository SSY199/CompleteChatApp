import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  messageType: {
    type: String,
    enum: ["text", "image", "video", "audio"],
    default: "text",
  },
  content: {
    type: String,
    required: function() {
      return this.messageType === "text";
    },
  },
  fileUrl: {
    type: String,
    required: function() {
      return this.messageType !== "text";
    },
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },

});

const Message = mongoose.model("Message", messageSchema);
export default Message;
