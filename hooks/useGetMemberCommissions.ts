import { Referral } from '@/hooks/useGetCommisions'
import { useQuery } from 'react-query'

export const useGetMemberCommissions = (code?: string) => {
  const getCommissions = async () => {
    const url = `/api/finance?code=${code}`

    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    return res.json()
  }

  const { data, isLoading } = useQuery(`commissions-${code}`, getCommissions, {
    enabled: code !== undefined && code !== ''
  })

  const total = data?.data.reduce(
    (a: number, com: Referral) =>
      a + com.fees.monthlyFee * (com.fees.commissionPercent / 100),
    0
  )

  return {
    data: data?.data,
    total: total,
    isLoading
  }
}
