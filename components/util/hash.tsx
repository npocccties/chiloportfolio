import { getCookieValue } from "../lib/cookie";
import { getUserInfoFormJwt } from "../lib/userInfo";
import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next'

const salt = process.env.BCRYPT_SALT as string

export async function makeHash(pass: string, req: NextApiRequest): Promise<string> {
  var eppn: string | undefined = ""
  const session_cookie = req.cookies["session_cookie"];
  if (session_cookie) {
    const userInfo = getUserInfoFormJwt(session_cookie);
    eppn = userInfo?.eppn
  }
  return await bcrypt.hash(pass + eppn ?? '', salt)
}
