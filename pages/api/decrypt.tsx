import { decrypt } from "@/util/Converter";
import { loggerError, loggerInfo } from "@/util/Logger";

import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  loggerInfo("*** decrypt api start ***");
  try {
    if (req.body.encryped) {
      return res.status(200).json({ result: decrypt(req.body.encryped) });
    } else {
      return res.status(200).json({ result: "" });
    }
  } catch (e) {
    loggerError("error! decrypt api");
    return res.status(500).json({ error: e });
  } finally {
    loggerInfo("*** decrypt api end ***");
  }
};

export default handler;
