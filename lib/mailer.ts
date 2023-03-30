import * as aws from '@aws-sdk/client-ses'
import { defaultProvider } from '@aws-sdk/credential-provider-node'
import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'

const ses = new aws.SES({
  region: 'ap-northeast-1',
  //@ts-ignore
  defaultProvider
})

export const sendLogMail = async (message: any) => {
  try {
    const transporter = nodemailer.createTransport({
      SES: { ses, aws }
    })

    transporter.once('idle', () => {
      if (transporter.isIdle()) {
        transporter.sendMail(
          {
            from: 'admin@beyondripped.ph',
            to: 'admin@beyondripped.ph',
            subject: 'Message',
            text: message,
            ses: {
              // optional extra arguments for SendRawEmail
              Tags: [
                {
                  Name: 'tag_name',
                  Value: 'tag_value'
                }
              ]
            }
          },
          (err: any, info: any) => {
            console.log({ err, info })
          }
        )
      }
    })
  } catch (error) {
    console.log(error)
  }
}

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
      host: 'beyondripped.ph',
      port: 465,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      },
      tls: { rejectUnauthorized: false }
    })
  )

  await mailer.sendMail(message, (error: any, info: any) => {
    if (error) {
      const message = typeof error === 'object' ? JSON.stringify(error) : error
      sendLogMail(message)
      return console.log(error)
    }
    sendLogMail(info?.response)
    console.log('Message sent: %s', info)
  })
}
