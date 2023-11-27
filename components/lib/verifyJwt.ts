import { jwtVerify } from "jose/jwt/verify";
import { importSPKI } from "jose/key/import";

import { loggerMWError, loggerMWInfo } from "../util/Logger";

const pubKey = process.env.orthros_login_key_base64;

// MEMO: middleware(edge runtime)で使用することを想定

export const verifyOrthrosJwt = async (jwt: string) => {
  const cryptKey = await getCryptKey();
  if (!cryptKey) {
    return false
  }

  try {
    const result = await jwtVerify(jwt, cryptKey, { algorithms: ["RS256"] });

    loggerMWInfo("verifyResult------------start");
    console.log(JSON.stringify(result));
    loggerMWInfo("verifyResult------------end");

    return true;
  } catch (e) {
    loggerMWError("error! invalid jwt", e);
    return false;
  }
};

const getCryptKey = async () => {
  try {
    const publicKey = atob(pubKey!).toString();
    const cryptKey = await importSPKI(publicKey, "RS256");

    return cryptKey;
  } catch (e) {
    console.log("error", e);

    loggerMWError("error! get public key");
  }
};