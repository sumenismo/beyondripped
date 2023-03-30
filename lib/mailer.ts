import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'

export const sendMail = async (message: any) => {
  /*
    service: 'GoDaddy',
    host: "smtp.office365.com",  
    secure: false,
    port: 587,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    } 
  */

  /*
    service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    */
  const mailer = nodemailer.createTransport(
    smtpTransport({
      host: 'smtpout.secureserver.net',
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      },
      tls: { rejectUnauthorized: false }
    })
  )

  const errorMailer = nodemailer.createTransport(
    smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: 'sumen.delrosario@gmail.com',
        pass: 'bimtxjnxngunvppd'
      }
    })
  )

  await mailer.sendMail(message, (error: any, info: any) => {
    if (error) {
      errorMailer.sendMail(
        {
          from: 'sumen.delrosario@gmail.com',
          to: 'sumen.delrosario@gmail.com',
          subject: 'Verify your registration',
          text: 'Please verify your registration.',
          html: `${error}`
        },
        () => {}
      )
      return console.log(error)
    }
    console.log('Message sent: %s', info)
  })
}
