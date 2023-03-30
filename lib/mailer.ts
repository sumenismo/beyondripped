import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'

export const sendMail = async (message: any) => {
  return new Promise((resolve, reject) => {
    try {
      const mailer = nodemailer.createTransport(
        smtpTransport({
          host: 'smtpout.secureserver.net',
          port: 587,
          auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
          },
          tls: { rejectUnauthorized: false }
        })
      )

      mailer.sendMail(message, (error: any, info: any) => {
        if (error) {
          reject(error)
          return
        }
        resolve(info)
      })
    } catch (error) {
      reject(error)
    }
  })
}
