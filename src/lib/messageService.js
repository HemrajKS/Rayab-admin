const twilio = require("twilio");

export const createMessage = async (
  name,
  email,
  userPhone,
  productId,
  productName,
  productLink
) => {
  const messageBody = `🔔 *Product Inquiry Alert!*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n📞 *Phone:* ${userPhone}\n🆔 *Product ID:* ${productId}\n📦 *Product Name:* ${productName}\n🔗 *Link:* ${productLink}`;

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  const message = await client.messages.create({
    body: messageBody,
    from: "whatsapp:+14155238886",
    to: "whatsapp:+919380684810",
  });

  console.log(message.body);
};
