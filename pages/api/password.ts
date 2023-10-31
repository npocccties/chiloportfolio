import type { NextApiRequest, NextApiResponse } from 'next'

const inputKey = process.env.INPUT_KEY as string

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const pass = req.headers['authorization'] ?? ''
  if (pass) {
    const result = pass == inputKey
    res.setHeader("content-type", "application/json");
    res.status(200).json({ result: result ? 1 : 0 })
  } else {
    res.status(200).json({ result: -1 })
  }
}

export default handler