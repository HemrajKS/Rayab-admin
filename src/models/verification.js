import { mongoose } from "mongoose";

const verficationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    _id: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      expires: 300, //OTP valid for 5 mins
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Verify =
  mongoose.models.verify || mongoose.model("verify", verficationSchema);
export default Verify;
