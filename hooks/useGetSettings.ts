import { useQuery } from 'react-query'

export const useGetSettings = () => {
  const getSettings = async () => {
    const res = await fetch('/api/admin/settings', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    return res.json()
  }

  const { data, isLoading } = useQuery('app-settings', getSettings)

  return {
    data: data?.data,
    isLoading
  }
}
