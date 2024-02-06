import { makeHash } from "@/util/hash";
import { loggerInfo } from "@/util/Logger";

import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const hash = req.body.session;
  loggerInfo(`*** judge api start ... hash: ${hash} ***`);
  const passArray = process.env.PASSWORD?.split(",");
  var result = 0;
  for (var i = 0; passArray && i < passArray.length; i++) {
    const pass = passArray[i];
    if ((await makeHash(pass, req)) == hash) {
      result = 1;
      break;
    }
  }
  res.status(200).json({ result: result });
  loggerInfo(`*** judge api end ... result: ${result} ***`);
};

export default handler;
