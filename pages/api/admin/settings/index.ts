import Settings from '@/models/Settings'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import dbConnect from '@lib/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session: any = await getServerSession(req, res, authOptions as any)
  await dbConnect()
  if (session?.user.role !== 'ADMIN') {
    res.status(401).json({ success: false, error: 'Unauthorized' })
    return
  }
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const settings = await Settings.findOne()
        res.status(200).json({ success: true, data: settings })
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
        const newSettings = req.body
        const settings = await Settings.findOneAndUpdate({}, { ...newSettings })

        res.status(201).json({ success: true, data: settings })
      } catch (error) {
        res.status(500).json({ success: false, error })
      }
      break

    default:
      break
  }
}
