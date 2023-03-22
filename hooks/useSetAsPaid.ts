import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'

export const useSetAsPaid = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const date = router.query.date

  const setAsPaid = async (id: string) => {
    const url = `/api/finance/${id}`
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    })
    return res.json
  }

  return useMutation(setAsPaid, {
    onSuccess: () => {
      queryClient.invalidateQueries(`commissions-${date}`)
    },
    onError: () => {}
  })
}
