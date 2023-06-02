import { ServiceFormArgs } from '@/pages/api/admin/service'
import { useMutation, useQueryClient } from 'react-query'

export const useService = () => {
  const queryClient = useQueryClient()

  const createService = async (args: ServiceFormArgs) => {
    const url = '/api/admin/service'
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(args),
      headers: { 'Content-Type': 'application/json' }
    })

    return res.json()
  }

  return useMutation(createService, {
    onSuccess: () => {
      queryClient.invalidateQueries('services')
    },
    onError: error => {
      console.log(error)
    }
  })
}
