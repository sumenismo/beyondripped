import { useQuery } from 'react-query'

export const useGetCommissions = () => {
  const getCommissions = async () => {
    const url = '/api/finance'
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    return res.json()
  }

  const { data, isLoading } = useQuery(`commissions`, getCommissions)

  return {
    data: data?.data,
    isLoading
  }
}
