import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

enum HttpMethod {
  get = "GET",
  post = "POST",
  delete = "DELETE",
}

interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

export default function withHandler(method: HttpMethod, fn: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== method) {
      return res.status(405).end();
    }
    try {
      await fn(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}

export { HttpMethod, ResponseType };
