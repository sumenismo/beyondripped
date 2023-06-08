import UserService from '@/models/UserService'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import dbConnect from '@lib/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

export interface ServiceFormArgs {
  name: string
  fee: number
  commission: number
  isMultiple?: boolean
  _id?: string
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session: any = await getServerSession(req, res, authOptions as any)
  if (session?.user.role !== 'FINANCE') {
    res.status(401).json({ success: false, error: 'Unauthorized' })
    return
  }

  await dbConnect()
  const { method } = req

  switch (method) {
    case 'POST':
      res.status(405)
      break
    case 'GET':
      const user = req.query.user as string
      const search = req.query.search as string
      const searchQuery =
        search !== undefined && search.trim() !== ''
          ? {
              $or: [{ name: new RegExp(search, 'i') }]
            }
          : null

      const query = Object.assign({ user }, searchQuery)

      const perPage = req.query.perPage ? Number(req.query.perPage) : 25
      const page = req.query.page ? Number(req.query.page) : 1

      const userServices = await UserService.find(query, '', {
        collation: { locale: 'en' },
        limit: perPage,
        skip: (page - 1) * perPage
      })
        .populate('service')
        .sort([['_id', -1]])
        .exec()

      const count = await UserService.find(query, {
        collation: { locale: 'en' }
      }).countDocuments()

      const data = {
        data: userServices,
        meta: {
          page,
          perPage,
          count
        }
      }

      res.status(200).json({ success: true, data })
      break
    case 'PUT':
      res.status(405)
      break
    case 'DELETE':
      res.status(405)
      break

    default:
      break
  }
}
