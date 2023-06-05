import Service from '@/models/Service'
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
  if (session?.user.role !== 'ADMIN') {
    res.status(401).json({ success: false, error: 'Unauthorized' })
    return
  }

  await dbConnect()
  const { method } = req

  switch (method) {
    case 'POST':
      const newService = req.body
      const service = await Service.create({ ...newService, isActive: true })
      res.status(201).json({ success: true, data: service })
      break
    case 'GET':
      const search = req.query.search as string

      const searchQuery =
        search !== undefined && search.trim() !== ''
          ? {
              $or: [{ name: new RegExp(search, 'i') }]
            }
          : null

      const query = Object.assign({ isActive: true }, searchQuery)

      const perPage = req.query.perPage ? Number(req.query.perPage) : 25
      const page = req.query.page ? Number(req.query.page) : 1

      const services = await Service.find(query, '', {
        collation: { locale: 'en' },
        limit: perPage,
        skip: (page - 1) * perPage
      })
        .sort([['_id', -1]])
        .exec()

      const count = await Service.find(query, {
        collation: { locale: 'en' }
      }).countDocuments()

      const data = {
        data: services,
        meta: {
          page,
          perPage,
          count
        }
      }

      res.status(200).json({ success: true, data })
      break
    case 'PUT':
      const { _id, ...rest } = req.body
      const updateService = await Service.findOneAndUpdate({ _id }, { ...rest })
      res.status(201).json({ success: true, data: updateService })
      break
    case 'DELETE':
      const { _id: serviceId } = req.body
      const deleteService = await Service.findOneAndUpdate(
        { _id: serviceId },
        { isActive: false }
      )
      res.status(201).json({ success: true, data: deleteService })
      break

    default:
      break
  }
}
