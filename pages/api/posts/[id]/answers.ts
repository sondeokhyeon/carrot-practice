import client from "@libs/server/client";
import withHandler, {
  HttpMethod,
  ResponseType,
} from "@libs/server/withHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
    body: { answer },
  } = req;
  // const post = await client.post.findUnique({
  //   where: {
  //     id: +id.toString()
  //   },
  //   select: {
  //     id:true
  //   }
  // })
  // if(!post) {
  //   res.status(404).json({ok:false, error: "not found"})
  //   return
  // }
  const newAnswer = await client.answer.create({
    data: {
      user: {
        connect: {
          id: user?.id,
        },
      },
      post: {
        connect: {
          id: +id.toString(),
        },
      },
      answer,
    },
  });
  console.log(newAnswer);
  res.json({ ok: true, answer: newAnswer });
}

export default withApiSession(
  withHandler({
    methods: [HttpMethod.post],
    handler,
    isPrivate: false,
  })
);
