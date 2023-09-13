import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    address: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: false,
    },
    orders: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);
userSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 3600, partialFilterExpression: { isActive: false } } //removed one hour after not verifying
);
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
