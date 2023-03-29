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

      const search = req.query.search as string
      const roleQuery = req.query.role ?? 'MEMBER'

      const searchQuery =
        search !== undefined && search.trim() !== ''
          ? {
              $or: [
                { name: new RegExp(search, 'i') },
                { email: new RegExp(search, 'i') }
              ]
            }
          : null

      const query = Object.assign(
        { role: roleQuery, isArchived: { $ne: true } },
        searchQuery
      )

      const perPage = req.query.perPage ? Number(req.query.perPage) : 25
      const page = req.query.page ? Number(req.query.page) : 1

      const user = await User.find(query, '-password', {
        collation: { locale: 'en' },
        limit: perPage,
        skip: (page - 1) * perPage
      })
        .sort([['_id', -1]])
        .populate('referrer')
        .exec()

      const count = await User.find(query, {
        collation: { locale: 'en' }
      }).countDocuments()

      const data = {
        user,
        meta: {
          page,
          perPage,
          count
        }
      }

      res.status(200).json({ success: true, data })
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
          html: `<p>Your email has been registered to Beyond Ripped as ${req.body.role}, verify your email by clicking this <a href='${process.env.NEXTAUTH_URL}/verify/${user.verify.code}'>link.</a></p>`
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
