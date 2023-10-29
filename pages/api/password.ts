import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt';

const hashPass = process.env.BCRYPT_HASH as string

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const pass = req.headers['authorization'] ?? ''
  if (pass) {
    const result = await isSamePass(pass as string, hashPass)
    res.setHeader("content-type", "application/json");
    res.status(200).json({ result: result ? 1 : 0 })
  } else {
    res.status(200).json({ result: -1 })
  }
}

async function isSamePass(unhashPass: string, hashPass: string): Promise<boolean> {
  return bcrypt.compare(unhashPass, hashPass)
}

export default handler