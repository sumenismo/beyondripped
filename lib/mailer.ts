import * as aws from '@aws-sdk/client-ses'
import { defaultProvider } from '@aws-sdk/credential-provider-node'
import nodemailer from 'nodemailer'

const ses = new aws.SES({
  region: 'ap-northeast-1',
  //@ts-ignore
  defaultProvider
})

export const sendMail = async (message: any) => {
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
            text: 'This is received',
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
