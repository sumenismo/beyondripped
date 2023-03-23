import Referral from '@/models/Referral'
import User from '@/models/User'
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
        const date = req.query.date
        const referralCode = req.query.code
        const search = req.query.search
        const page = req.query.page
        const perPage = req.query.perPage

        const dateFilter =
          date !== undefined ? new Date(date as string) : new Date()

        const pipeline: any = [
          {
            $addFields: {
              currentMonth: { $month: dateFilter },
              currentYear: { $year: dateFilter }
            }
          },
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: [{ $month: '$date' }, '$currentMonth'] },
                  { $eq: [{ $year: '$date' }, '$currentYear'] }
                ]
              }
            }
          },
          {
            $lookup: {
              from: User.collection.name,
              localField: 'member',
              foreignField: '_id',
              as: 'member'
            }
          },
          {
            $unwind: '$member'
          },
          {
            $lookup: {
              from: User.collection.name,
              localField: 'referred',
              foreignField: '_id',
              as: 'referred'
            }
          },
          {
            $unwind: '$referred'
          }
        ]

        if (referralCode) {
          const userWithCode = referralCode
            ? await User.findOne({ referralCode })
            : undefined

          pipeline.push({
            $match: {
              'member._id': userWithCode._id
            }
          })
        }

        if (search) {
          pipeline.push({
            $match: {
              $or: [
                { 'member.name': { $regex: search, $options: 'i' } },
                { 'member.email': { $regex: search, $options: 'i' } }
              ]
            }
          })
        }

        pipeline.push(
          {
            $project: {
              'member.name.password': 0
            }
          },
          {
            $sort: {
              member: 1
            }
          }
        )

        if (page && perPage) {
          pipeline.push({
            $facet: {
              metadata: [
                { $count: 'total' },
                { $addFields: { page, perPage } }
              ],
              data: [
                { $skip: (Number(page) - 1) * Number(perPage) },
                { $limit: Number(perPage) }
              ]
            }
          })
        }

        const referrals = await Referral.aggregate(pipeline)

        res.status(200).json({ success: true, data: referrals })
      } catch (error) {
        console.log({ error })
        res.status(500).json({ success: false, error })
      }
      break

    case 'POST':
      break

    default:
      break
  }
}

/*
          {
            $match: {
              member: new mongoose.Types.ObjectId('6418fdbd38a8d4219bb74ab1')
            }
          },

try {
        const user = await User.aggregate([
          {
            $match: {
              activeDate: {
                $exists: true
              },
              referrer: {
                $exists: true
              }
            }
          },
          {
            $match: {
              $and: [
                {
                  'activeDate.start': {
                    $ne: null
                  }
                },
                {
                  'activeDate.end': {
                    $ne: null
                  }
                },
                {
                  'activeDate.start': {
                    $type: 'date'
                  }
                },
                {
                  'activeDate.end': {
                    $type: 'date'
                  }
                }
              ]
            }
          },
          {
            $lookup: {
              from: 'users',
              localField: 'referrer',
              foreignField: '_id',
              as: 'referredUser'
            }
          },
          {
            $addFields: {
              yearDiff: {
                $subtract: [
                  { $year: '$activeDate.end' },
                  { $year: '$activeDate.start' }
                ]
              },
              monthDiff: {
                $subtract: [
                  { $month: '$activeDate.end' },
                  { $month: '$activeDate.start' }
                ]
              }
            }
          },
          {
            $addFields: {
              totalMonths: {
                $cond: {
                  if: {
                    $eq: [
                      { $year: '$activeDate.end' },
                      { $year: '$activeDate.start' }
                    ]
                  },
                  then: { $add: ['$monthDiff', 1] },
                  else: {
                    $add: [{ $multiply: ['$yearDiff', 12] }, '$monthDiff', 1]
                  }
                }
              }
            }
          },
          {
            $addFields: {
              monthRange: {
                $range: [
                  { $month: '$activeDate.start' },
                  {
                    $add: [{ $month: '$activeDate.start' }, '$totalMonths', -1]
                  }
                ]
              }
            }
          },

          {
            $project: {
              email: 1,
              name: 1,
              role: 1,
              referrer: 1,
              referralCode: 1,
              activeDate: 1,
              verify: 1,
              referredUser: {
                $arrayElemAt: ['$referredUser', 0]
              },
              activeMonths: {
                $map: {
                  input: '$monthRange',
                  as: 'month',
                  in: {
                    $dateToString: {
                      format: '%Y-%m',
                      date: {
                        $dateFromParts: {
                          year: { $year: '$activeDate.start' },
                          month: '$$month',
                          day: 1
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        ])

        res.status(200).json({ success: true, data: user })
      } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error })
      }
*/
