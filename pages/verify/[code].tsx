import { PasswordForm } from '@/components/PasswordForm'
import { Typography } from '@mui/material'

export interface VerifyProps {
  isVerified: boolean
}

export default function Verify({ isVerified }: VerifyProps) {
  if (!isVerified) {
    return <PasswordForm />
  }

  return <Typography variant='body1'>Invalid or expired code</Typography>
}

export async function getServerSideProps(context: any) {
  let isVerified = false
  try {
    const url = `${process.env.NEXTAUTH_URL}/api/userAuth/checkVerify`
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        code: context.params.code
      }),
      headers: { 'Content-Type': 'application/json' }
    })

    const { user } = await res.json()
    console.log({ user })
    isVerified = user === undefined || user?.verify.verified || false
  } catch (error) {
    console.log(error)
  }

  return {
    props: { isVerified }
  }
}
