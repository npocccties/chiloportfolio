import type { NextApiRequest, NextApiResponse } from 'next'
import { loggerInfo } from '@/util/Logger';
import { makeHash } from '@/util/hash'
import { encrypt } from '@/util/Converter';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  loggerInfo('*** encrypt api start ***')
  var result = ""
  const pass = process.env.PASSWORD ?? ''
  res.status(200).json({ result: encrypt(req.body.password) })
  loggerInfo('*** encrypt api end ***')
}

export default handler