import { decrypt } from "@/util/Converter";
import { loggerInfo } from "@/util/Logger";

import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  loggerInfo("*** decrypt api start ***");
  var result = "";
  if (req.body.encryped) {
    res.status(200).json({ result: decrypt(req.body.encryped) });
  } else {
    res.status(200).json({ result: "" });
  }
  loggerInfo("*** decrypt api end ***");
};

export default handler;
