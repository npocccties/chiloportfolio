import type { NextApiRequest, NextApiResponse } from 'next'
import { loggerInfo } from '@/util/Logger';
import { makeHash } from '@/util/hash'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  loggerInfo('*** auth api start ***')
  var result = ""
  const passArray = process.env.PASSWORD?.split(',')
  for (var i = 0; passArray && i < passArray.length; i++) {
    const pass = passArray[i]
    if (pass == req.body.password) {
      result = await makeHash(pass, req)
      break
    }
  }
  res.status(200).json({ result: result })
  loggerInfo('*** auth api end ***')
}

export default handler