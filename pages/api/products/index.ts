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
  if (req.method === HttpMethod.get) {
    const products = await client.product.findMany({});
    res.json({
      ok: true,
      products,
    });
  }
  if (req.method === HttpMethod.post) {
    await postReqHandler(req, res);
  }
}

async function postReqHandler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { name, price, description },
    session: { user },
  } = req;
  const product = await client.product.create({
    data: {
      name,
      price: +price,
      description,
      image: "xxx",
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
  res.json({ ok: true, product });
}

export default withApiSession(
  withHandler({
    methods: [HttpMethod.get, HttpMethod.post],
    handler,
    isPrivate: false,
  })
);
