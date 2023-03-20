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
      res.status(405)
      break

    case 'POST':
      res.status(405)
      break

    case 'DELETE':
      res.status(405)
      break

    case 'PUT':
      res.status(405)
      break

    default:
      break
  }
}
