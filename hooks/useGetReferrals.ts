import { Referral } from '@/hooks/useGetCommisions'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export const useGetReferrals = () => {
  const router = useRouter()
  const date = router.query.date
  const page = router.query.page ?? 1
  const perPage = router.query.perPage ?? 25

  const getReferrals = async () => {
    const res = await fetch(
      `/api/member/referrals?date=${date}&page=${page}&perPage=${perPage}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    )

    return res.json()
  }

  const { data, isLoading } = useQuery(
    `referrals-${date}-${page}-${perPage}`,
    getReferrals
  )

  const total = data?.data[0].data.reduce(
    (a: number, com: Referral) =>
      a + com.fees.monthlyFee * (com.fees.commissionPercent / 100),
    0
  )

  return {
    data: data?.data[0].data,
    isLoading,
    total,
    meta: data?.data[0].metadata[0]
  }
}
