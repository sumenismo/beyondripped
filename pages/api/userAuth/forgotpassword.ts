import { sendMail } from '@/lib/mailer'
import User from '@/models/User'
import dbConnect from '@lib/mongodb'
import { addDays } from 'date-fns'
import { NextApiRequest, NextApiResponse } from 'next'
import { v4 } from 'uuid'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect()
  const { method, body } = req
  switch (method) {
    case 'POST':
      try {
        const code = v4()
        const user = await User.findOneAndUpdate(
          { email: body.email },
          {
            $set: {
              verify: {
                verified: false,
                code,
                expire: addDays(new Date(), 3)
              }
            }
          }
        ).select('-password')

        const mail = await sendMail({
          from: 'admin@beyondripped.ph',
          to: body.email,
          subject: 'Password Reset',
          text: 'Password reset',
          html: `<p>Input your new password by clicking this <a href='${process.env.NEXTAUTH_URL}/verify/${code}'>link.</a></p>`
        })

        res.status(201).json({ success: true, user, mail })
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
