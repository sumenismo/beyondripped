import { ServiceFormArgs } from '@/pages/api/admin/service'
import { useMutation, useQueryClient } from 'react-query'

export const useDeleteService = () => {
  const queryClient = useQueryClient()

  const deleteService = async (args: ServiceFormArgs) => {
    const url = '/api/admin/service'
    const res = await fetch(url, {
      method: 'DELETE',
      body: JSON.stringify(args),
      headers: { 'Content-Type': 'application/json' }
    })

    return res.json()
  }

  return useMutation(deleteService, {
    onSuccess: () => {
      queryClient.invalidateQueries('services')
    },
    onError: error => {
      console.log(error)
    }
  })
}
