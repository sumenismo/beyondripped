import User from '@/models/User'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { generateHash } from '@/utils/password'
import dbConnect from '@lib/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session: any = await getServerSession(req, res, authOptions as any)
  await dbConnect()
  const userEmail = session?.user.email
  const { method } = req
  switch (method) {
    case 'PUT':
      try {
        const password = await generateHash(req.body.password)
        const user = await User.findOneAndUpdate(
          { email: userEmail },
          {
            password
          }
        ).select('-password')

        res.status(201).json({ success: true, user })
      } catch (error) {
        console.error(error)
        res.status(500).json({ error })
      }

      break

    default:
      res.status(405).json({ success: false, error: 'Method not allowed.' })
      break
  }
}
