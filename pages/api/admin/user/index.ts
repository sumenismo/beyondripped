import { sendMail } from '@/lib/mailer'
import { addDays } from '@/lib/utils'
import User from '@/models/User'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import dbConnect from '@lib/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { v4 } from 'uuid'
import voucherCodes from 'voucher-code-generator'

export interface UserFormArgs {
  username: string
  password?: string
  role: 'ADMIN' | 'MEMBER' | 'FINANCE'
  referralCode: string
}

const generateCode = () => {
  return voucherCodes.generate({
    pattern: '########',
    charset: 'alphanumeric',
    prefix: '',
    postfix: '',
    count: 1
  })[0]
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session: any = await getServerSession(req, res, authOptions as any)
  await dbConnect()
  const { method } = req

  switch (method) {
    case 'GET':
      if (session?.user.role !== 'ADMIN') {
        res.status(401).json({ success: false, error: 'Unauthorized' })
        return
      }

      const roleQuery = req.query.role ?? 'MEMBER'
      const user = await User.find({ role: roleQuery }).select('-password')
      res.status(200).json({ success: true, data: user })
      break

    case 'POST':
      try {
        let referrer

        if (req.body.role !== 'MEMBER' && session?.user.role !== 'ADMIN') {
          res.status(401).json({ success: false, error: 'Unauthorized' })
          return
        }

        if (req.body.code && req.body.code !== '') {
          referrer = await User.findOne({ referralCode: req.body.code })
        }
        const user = await User.create({
          ...req.body,
          referralCode: generateCode(),
          referrer: referrer?._id,
          verify: {
            verified: false,
            code: v4(),
            expire: addDays(new Date(), 3)
          }
        })

        sendMail({
          from: 'no-reply@beyondripped.com',
          to: user.email,
          subject: 'Verify your registration',
          text: 'Please verify your registration.',
          html: `<p>Please verify your email by going to this <a href='${process.env.NEXTAUTH_URL}/verify/${user.verify.code}'>link</a> </p>`
        })

        res.status(201).json({ success: true, data: user })
      } catch (error: any) {
        console.log({ error })
        if (error?.code === 11000) {
          res.status(409).json({ success: false, data: req.body })
          return
        }
        res.status(400).json({ success: false, data: { errCode: error?.code } })
      }
      break

    default:
      break
  }
}
