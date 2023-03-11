import { validate } from '@/utils/password'
import clientPromise from '@lib/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise
    const db = client.db()
    const { username, password } = req.body
    const user = await db.collection('users').findOne({ email: username })

    if (user && validate(password, user.password)) {
      res.json(user)
    } else {
      res.status(401).json({ error: 'Unauthorized' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}
