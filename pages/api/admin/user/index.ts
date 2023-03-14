import { sendMail } from '@/lib/mailer'
import { addDays } from '@/lib/utils'
import User from '@/models/User'
import dbConnect from '@lib/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { v4 } from 'uuid'
import voucherCodes from 'voucher-code-generator'

export interface UserFormArgs {
  username: string
  password?: string
  role: 'ADMIN' | 'MEMBER' | 'FINANCE'
  referralCode: string
}

const validateUserBody = (user: UserFormArgs) => {
  if (user.role === 'FINANCE') {
  }

  return true
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
  await dbConnect()
  const { method } = req

  switch (method) {
    case 'GET':
      break

    case 'POST':
      try {
        const user = await User.create({
          ...req.body,
          referralCode: generateCode(),
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
        console.log({ error: error?.code })
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
