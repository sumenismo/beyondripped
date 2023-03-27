import { useMutation } from 'react-query'

export const useForgotPassword = () => {
  const forgotPasword = async (args: any) => {
    const url = '/api/userAuth/forgotpassword'
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(args),
      headers: { 'Content-Type': 'application/json' }
    })
    return res.json()
  }

  return useMutation(forgotPasword, {
    onSuccess: () => {},
    onError: error => {
      console.log(error)
    }
  })
}
