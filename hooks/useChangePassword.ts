import { PasswordFormvalues } from '@/components/PasswordForm'
import { useMutation } from 'react-query'

export const useChangePassword = () => {
  const changePassword = async (args: PasswordFormvalues) => {
    const url = '/api/userAuth/changepassword'
    const res = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({ password: args.password }),
      headers: { 'Content-Type': 'application/json' }
    })

    return res.json()
  }

  return useMutation(changePassword, {
    onSuccess: () => {
      //setTimeout(() => signOut(), 2000)
    },
    onError: error => {
      console.log(error)
    }
  })
}
