const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const MessageSchema = new Schema(
  {
    text: {
      type: String,
    },
    file: {
      type: String,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Message = model("Message", MessageSchema);
module.exports = Message;