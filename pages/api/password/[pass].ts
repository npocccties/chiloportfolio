import type { NextApiRequest } from 'next'

(req: NextApiRequest) => {
  const pass = req.query.pass as string;
}
