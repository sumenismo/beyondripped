import User from '@/models/User'
import { generateHash } from '@/utils/password'
import dbConnect from '@lib/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()
    const { code, password } = req.body
    const user = await User.findOneAndUpdate(
      { 'verify.code': code },
      {
        password: await generateHash(password),
        $set: {
          verify: {
            verified: true
          }
        }
      }
    )
    res.status(201).json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}
