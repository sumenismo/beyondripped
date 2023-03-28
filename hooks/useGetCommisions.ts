import { Member } from '@/components/MemberList'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export interface Referral {
  _id: string
  member: Member
  referred: Member
  date: Date
  isPaid?: boolean
  fees: {
    monthlyFee: number
    commissionPercent: number
  }
}

export const useGetCommissions = () => {
  const router = useRouter()
  const date = router.query.date
  const code = router.query.code
  const search = router.query.search
  const page = router.query.page ?? 1
  const perPage = router.query.perPage ?? 25

  const getCommissions = async () => {
    const url = `/api/finance?date=${date}${code ? `&code=${code}` : ''}${
      search ? `&search=${search}` : ''
    }&page=${page}&perPage=${perPage}`

    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    return res.json()
  }

  const { data, isLoading } = useQuery(
    `commissions-${date}-${code}-${search}-${page}-${perPage}`,
    getCommissions,
    {
      enabled: date !== undefined
    }
  )

  return {
    data: data?.data[0].data,
    isLoading,
    meta: data?.data[0].metadata[0]
  }
}
