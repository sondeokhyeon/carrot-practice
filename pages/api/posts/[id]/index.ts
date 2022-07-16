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
  } = req;
  const post = await client.post.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      user: {
        select: {
          name: true,
          id: true,
          avatar: true,
        },
      },
      answers: {
        select: {
          answer: true,
          id: true,
          createdAt: true,
          user: {
            select: {
              name: true,
              id: true,
              avatar: true,
            },
          },
        },
      },
      _count: {
        select: {
          answers: true,
          wondering: true,
        },
      },
    },
  });
  const isWondering = Boolean(
    await client.wondering.findFirst({
      where: {
        postId: +id.toString(),
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  if (!post) res.status(404).json({ ok: false, error: "Not found post" });
  res.json({ ok: true, post, isWondering });
}

export default withApiSession(
  withHandler({
    methods: [HttpMethod.get],
    handler,
    isPrivate: false,
  })
);
