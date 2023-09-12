import nodemailer from "nodemailer";
import { MAIL_SETTINGS } from "@/app/constants/constants";
const transporter = nodemailer.createTransport(MAIL_SETTINGS);

export const sendMail = async (params) => {
  try {
    let info = await transporter.sendMail({
      from: MAIL_SETTINGS.auth.user,
      to: params.to,
      subject: "Rayab-Intl OTP",
      html: `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2;margin:20">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a
            href=""
            style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600"
          >
            Rayab International
          </a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>
          Thank you for choosing Rayab International. Use the following OTP to
          complete your Sign Up procedures. OTP is valid for 5 minutes
        </p>
        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px; display: flex; align-items:center; justify-content:center">
          ${params.otp}
        </h2>
        <p style="font-size:0.9em;">
          Regards,
          <br />
          Rayab International
        </p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          <p>Rayab International</p>
        </div>
      </div>
    </div>`,
    });
    return info;
  } catch (error) {
    console.log(error);
    return false;
  }
};
