import User from '@/models/User'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import dbConnect from '@lib/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session: any = await getServerSession(req, res, authOptions as any)
  await dbConnect()
  if (session?.user.role !== 'MEMBER') {
    res.status(401).json({ success: false, error: 'Unauthorized' })
    return
  }
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const user = await User.findOne({ email: session?.user.email }).select(
          '-password'
        )
        res.status(200).json({ success: true, data: user })
      } catch (error) {
        res.status(500).json({ success: false, error })
      }
      break

    case 'POST':
      res.status(405)
      break

    case 'DELETE':
      res.status(405)
      break

    case 'PUT':
      try {
        res.status(201).json({ success: true })
      } catch (error) {
        res.status(500).json({ success: false, error })
      }
      break

    default:
      break
  }
}
