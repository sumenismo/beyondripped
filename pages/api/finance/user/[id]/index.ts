import { Member } from '@/components/MemberList'
import { getMonths } from '@/lib/utils'
import Referral from '@/models/Referral'
import Service from '@/models/Service'
import Settings from '@/models/Settings'
import User from '@/models/User'
import UserService from '@/models/UserService'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import dbConnect from '@lib/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

const checkIfBothActive = (member: Member, date: string) => {
  if (!member.activeDate?.end || !member.activeDate?.start) {
    return false
  }
  if (
    new Date(date) <= new Date(member.activeDate.end) &&
    new Date(date) >= new Date(member.activeDate.start)
  ) {
    return true
  }
  return false
}

const getDateRange = (
  nonUpdateUserData: Member,
  start: string,
  end: string
) => {
  //extending and currently inactive
  if (
    nonUpdateUserData.activeDate?.start &&
    nonUpdateUserData.activeDate?.end &&
    new Date(nonUpdateUserData.activeDate.end) < new Date()
  ) {
    return getMonths(new Date(start), new Date(end))
  }

  //extending and currently active
  if (
    nonUpdateUserData.activeDate?.start &&
    nonUpdateUserData.activeDate?.end
  ) {
    return getMonths(new Date(nonUpdateUserData.activeDate.end), new Date(end))
  }
  //newly activated
  return getMonths(new Date(start), new Date(end))
}

const setReferrals = async (
  createdUser: Member,
  start: string,
  end: string
) => {
  try {
    if (createdUser.referrer) {
      const referrerUser: any = await User.findOne({
        _id: createdUser.referrer
      })

      const monthRange = getDateRange(createdUser, start, end)

      const fees = await Settings.findOne()

      Promise.all(
        monthRange.map(async (date: any) => {
          const isActive = checkIfBothActive(referrerUser, date)
          await Referral.create({
            member: referrerUser._id,
            referred: createdUser._id,
            date,
            isActive,
            fees: {
              commissionPercent: fees.commissionPercent,
              monthlyFee: fees.monthlyFee
            }
          })
        })
      )
    }
  } catch (error) {
    console.log(error)
  }
}

const findAndUpdateReferrals = async (
  referrer: Member,
  start: Date,
  end: Date
) => {
  try {
    await Referral.updateMany(
      {
        member: referrer._id,
        isActive: false,
        date: {
          $gte: new Date(start),
          $lt: new Date(end)
        }
      },
      {
        isActive: true
      }
    )
  } catch (error) {
    console.log(error)
  }
}

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
        //should be moved to a new endpoint: /finance/userservice
        case 'ENROLL':
          try {
            const { start, end, service: serviceId } = req.body

            if (!start || !end || !serviceId) {
              res.status(400).json({ success: false, error: 'Invalid data' })
              return
            }

            const serviceToEnroll = await Service.findOne({ _id: serviceId })

            const put_user = await User.findOne({ _id: put_userId }).select(
              '-password'
            )

            const enrolled = await UserService.find({
              user: put_userId,
              service: serviceId
            })

            if (
              enrolled &&
              enrolled.length > 0 &&
              !serviceToEnroll.isMultiple
            ) {
              res
                .status(401)
                .json({ success: false, error: 'Already enrolled' })
              return
            }

            const newEnrolled = await UserService.create({
              user: put_userId,
              service: serviceToEnroll._id,
              name: serviceToEnroll.name,
              fee: serviceToEnroll.fee,
              commission: serviceToEnroll.commission,
              activeDate: {
                start: new Date(start),
                end: new Date(end)
              }
            })

            // setReferrals(put_user, start, end)
            // findAndUpdateReferrals(put_user, start, end)

            res.status(201).json({
              success: true,
              data: { user: put_user, enrolled: newEnrolled }
            })
          } catch (error) {
            res.status(500).json({ success: false, error })
          }

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
