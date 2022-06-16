import client from "@libs/server/client";
import withHandler, { HttpMethod } from "@libs/server/withHandler";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  res.status(200).end();
}

export default withHandler(HttpMethod.post, handler);
