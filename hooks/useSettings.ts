import { SettingsFormValues } from '@/components/SettingsForm'
import { useMutation, useQueryClient } from 'react-query'

export const useSettings = () => {
  const queryClient = useQueryClient()
  const settings = async (args: SettingsFormValues) => {
    const url = '/api/admin/settings'
    const res = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(args),
      headers: { 'Content-Type': 'application/json' }
    })

    return res.json()
  }

  return useMutation(settings, {
    onSuccess: () => {
      queryClient.invalidateQueries('app-settings')
    },
    onError: error => {
      console.log(error)
    }
  })
}
