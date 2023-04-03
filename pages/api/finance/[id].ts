import Referral from '@/models/Referral'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import dbConnect from '@lib/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session: any = await getServerSession(req, res, authOptions as any)
  await dbConnect()
  const { method } = req

  if (session?.user.role !== 'FINANCE') {
    res.status(401).json({ success: false, error: 'Unauthorized' })
    return
  }

  switch (method) {
    case 'GET':
      try {
        const id = req.query.id
        const referrals = await Referral.find({ member: id })
        res.status(201).json({ success: true, data: referrals })
      } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error })
      }
      break
    case 'PUT':
      try {
        const id = req.query.id
        const referral = await Referral.findOneAndUpdate(
          { _id: id, isActive: true },
          { isPaid: true },
          { new: true }
        )

        res.status(201).json({ success: true, data: referral })
      } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error })
      }

      break

    default:
      break
  }
}
