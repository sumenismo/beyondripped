import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const today = new Date()
  res.status(200).send(`${today.toLocaleString()}`)
}
