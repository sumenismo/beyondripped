import User from '@/models/User'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import dbConnect from '@lib/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session: any = await getServerSession(req, res, authOptions as any)
  await dbConnect()
  const { method } = req

  switch (method) {
    case 'GET':
      if (session?.user.role !== 'FINANCE') {
        res.status(401).json({ success: false, error: 'Unauthorized' })
        return
      }

      const userId = req.query.id
      if (userId === undefined) {
        return
      }

      const user = await User.findById(userId)
        .populate('referrer')
        .select('-password')
      res.status(200).json({ success: true, data: user })
      break

    case 'POST':
      res.status(405)
      break

    case 'DELETE':
      res.status(405)
      break

    case 'PUT':
      if (session?.user.role !== 'FINANCE') {
        res.status(401).json({ success: false, error: 'Unauthorized' })
        return
      }

      const put_userId = req.query.id

      if (put_userId === undefined) {
        res.status(400).json({ success: false, error: 'Invalid data' })
        return
      }
      const action = req.body.action

      switch (action) {
        case 'ACTIVATE':
          const { start, end } = req.body

          if (!start || !end) {
            res.status(400).json({ success: false, error: 'Invalid data' })
            return
          }

          const put_user = await User.findOneAndUpdate(
            { _id: put_userId },
            {
              activeDate: {
                start: new Date(start),
                end: new Date(end)
              }
            }
          ).select('-password')

          // if (put_user.referrer) {
          //   const referrerUser: any = await User.findOne({
          //     _id: put_user.referrer
          //   })

          //   if (
          //     referrerUser.activeDate &&
          //     new Date(referrerUser.activeDate.start) < new Date() &&
          //     new Date(referrerUser.activeDate.end) > new Date()
          //   ) {
          //     const monthRange = getMonths(new Date(start), new Date(end))

          //     const fees = await Settings.findOne()

          //     Promise.all(
          //       monthRange.map(async date => {
          //         await Referral.create({
          //           member: put_user.referrer,
          //           referred: put_user._id,
          //           date,
          //           fees: {
          //             commissionPercent: fees.commissionPercent,
          //             monthlyFee: fees.monthlyFee
          //           }
          //         })
          //       })
          //     )
          //   }
          // }

          res.status(201).json({ success: true, data: put_user })
          break

        case 'ARCHIVE':
          try {
            const archive_user = await User.findOneAndUpdate(
              { _id: put_userId },
              {
                isArchived: true
              }
            ).select('-password')

            res.status(201).json({ success: true, data: archive_user })
          } catch (error) {
            res.status(500).json({ success: false, error })
          }

          break

        default:
          res.status(400).json({ success: false, error: 'Invalid data' })
          break
      }
      break

    default:
      break
  }
}
