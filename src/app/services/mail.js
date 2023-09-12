import nodemailer from "nodemailer";
import { MAIL_SETTINGS } from "@/app/constants/constants";
import fs from "fs/promises";
import path from 'path';
import ejs from "ejs";

const transporter = nodemailer.createTransport(MAIL_SETTINGS);

export const sendMail = async (params) => {
  const emailTemplatePath = path.join(process.cwd(), '/src/app/templates', `${params.template}.ejs`);
  const emailTemplate = await fs.readFile(emailTemplatePath, "utf-8");
  const compiledTemplate = ejs.compile(emailTemplate);

  try {
    let info = await transporter.sendMail({
      from: MAIL_SETTINGS.auth.user,
      to: params.to,
      subject: "Rayab International Company",
      html: compiledTemplate(params),
    });
    return info;
  } catch (error) {
    console.log(error);
    return false;
  }
};
