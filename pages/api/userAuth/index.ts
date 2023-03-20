import User from '@/models/User'
import { generateHash } from '@/utils/password'
import dbConnect from '@lib/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()
    const { username, password } = req.body
    console.log(await generateHash(password))
    const user = await User.findOne({ email: username })

    if (!user.verifyPassword(password)) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }
    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}
