import { encrypt } from "@/util/Converter";
import { loggerInfo } from "@/util/Logger";

import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  loggerInfo("*** encrypt api start ***");
  res.status(200).json({ result: encrypt(req.body.password) });
  loggerInfo("*** encrypt api end ***");
};

export default handler;
