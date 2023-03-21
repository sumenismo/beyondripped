import User from '@/models/User'
import dbConnect from '@lib/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()
    const { code } = req.body
    const user = await User.findOne({ 'verify.code': code })

    if (!user || user.verify.verified === true) {
      res
        .status(400)
        .json({ success: false, error: 'Already verified or expired.' })
      return
    }

    res.status(201).json({ user, success: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}
