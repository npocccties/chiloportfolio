import type { NextApiRequest, NextApiResponse } from 'next'
import { loggerInfo } from '@/util/Logger';
import { makeHash } from '@/util/hash'
import { decrypt, encrypt } from '@/util/Converter';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  loggerInfo('*** decrypt api start ***')
  var result = ""
  if (req.body.encryped) {
    res.status(200).json({ result: decrypt(req.body.encryped) })
  } else {
    res.status(200).json({ result: '' })
  }
  loggerInfo('*** decrypt api end ***')
}

export default handler