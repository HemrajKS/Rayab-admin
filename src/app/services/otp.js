import otpGenerator from "otp-generator";
import { OTP_LENGTH, OTP_CONFIG } from "@/app/constants/constants";

export const generateOTP = () => {
  const otp = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);

  return otp;
};
