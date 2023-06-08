import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'

export const useActivateMember = () => {
  const router = useRouter()
  const id = router.query.id
  const queryClient = useQueryClient()

  const activateMember = async (args: any) => {
    const url = `/api/finance/user/${id}`
    const res = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        ...args,
        id,
        action: 'ENROLL'
      }),
      headers: { 'Content-Type': 'application/json' }
    })

    return res.json()
  }

  return useMutation(activateMember, {
    onSuccess: () => {
      queryClient.invalidateQueries(`user-${id}`)
    },
    onError: (error: any) => {
      console.log(error?.message)
    }
  })
}
