import User from '@/models/User'
import dbConnect from '@lib/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()
    const { code } = req.body
    const user = await User.findOne({ 'verify.code': code })

    res.status(201).json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}
