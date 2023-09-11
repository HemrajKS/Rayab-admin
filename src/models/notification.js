import mongoose, { Schema, model } from "mongoose";

// Define the notification schema
const notificationSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Define the Notification model
const Notification =
  mongoose.models.notifications ||
  mongoose.model("notifications", notificationSchema);

export default Notification;
