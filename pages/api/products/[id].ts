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
  const { id } = req.query;
  const product = await client.product.findUnique({
    where: {
      id: +id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
  const terms = product?.name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  }));
  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: product?.id,
        },
      },
    },
  });
  console.log(relatedProducts);
  res.json({ ok: true, product, relatedProducts });
}

export default withApiSession(
  withHandler({
    methods: [HttpMethod.get],
    handler,
    isPrivate: false,
  })
);
