import twilio from "twilio";
import client from "@libs/server/client";
import withHandler, {
  HttpMethod,
  ResponseType,
} from "@libs/server/withHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import smtpTransport from "@libs/server/email";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;
  if (!user) {
    res.status(400).json({ ok: false });
  }
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  if (phone) {
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.MY_PHONE!,
      body: `Your login token is ${payload}`,
    });
    console.log("🚀 ~ file: enter.tsx ~ line 43 ~ message", message);
  }
  if (email) {
    const mailOptions = {
      from: process.env.GMAIL_ID,
      to: email,
      subject: "Nomad Carrot Authenication Email",
      text: `Authenication Code: ${payload}`,
    };

    smtpTransport.sendMail(mailOptions, (error, res) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log(res);
      return;
    });
    smtpTransport.close();
  }
  res.json({
    ok: true,
  });
}

export default withHandler(HttpMethod.post, handler);
