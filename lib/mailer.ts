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
            text: 'There is an error',
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
