
import { NextResponse } from "next/server";
const twilio = require("twilio");


export async function POST(req) {
  try {
    const body = await req.json();

    const createMessage = async (
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
    

    createMessage(
      body.name,
      body.email,
      body.phone,
      body.productId,
      body.productName,
      `https://shop.eagleeye-worldwide.com/products/${body.productId}`
    );

    return NextResponse.json({ message: "success" });
  } catch (error) {
 console.log(error)
    return NextResponse.json("error", {
      status: 500,
      headers: {
        "Access-Control-Allow-Methods": "POST",
      },
    });
  }
}
