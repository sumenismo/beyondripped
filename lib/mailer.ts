import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'

export const sendMail = async (message: any) => {
  const mailer = nodemailer.createTransport(
    smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    })
  )

  mailer.sendMail(message, (error: any, info: any) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message sent: %s', info)
  })
}
