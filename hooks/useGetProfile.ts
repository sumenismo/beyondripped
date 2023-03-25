import { useQuery } from 'react-query'

export const useGetProfile = () => {
  const getProfile = async () => {
    const res = await fetch('/api/member', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    return res.json()
  }

  const { data, isLoading } = useQuery('profile', getProfile)

  return {
    data: data?.data,
    isLoading
  }
}
