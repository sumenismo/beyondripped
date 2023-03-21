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
      break

    case 'POST':
      break

    default:
      break
  }
}
