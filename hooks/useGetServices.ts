import { useQuery } from 'react-query'

export const useGetServices = () => {
  const getServices = async () => {
    const res = await fetch('/api/admin/service', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    return res.json()
  }

  const { data, ...rest } = useQuery('services', getServices)

  return {
    data: data?.data,
    ...rest
  }
}
