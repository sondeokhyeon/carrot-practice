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

interface ConfigType {
  method: HttpMethod;
  handler: NextApiHandler;
  isPrivate?: boolean;
}

export default function withHandler({
  method,
  handler,
  isPrivate = true,
}: ConfigType) {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
    if (req.method !== method) {
      return res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res
        .status(401)
        .json({ ok: false, msg: "please login and try again" });
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}

export { HttpMethod };

export type { ResponseType };
