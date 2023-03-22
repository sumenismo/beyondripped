import { Member } from '@/components/MemberList'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export interface Referral {
  _id: string
  member: Member
  referred: Member
  date: Date
  isPaid?: boolean
}

export const useGetCommissions = () => {
  const router = useRouter()
  const date = router.query.date

  const getCommissions = async () => {
    const url = `/api/finance?date=${date}`

    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    return res.json()
  }

  const { data, isLoading } = useQuery(`commissions-${date}`, getCommissions, {
    enabled: date !== undefined
  })

  return {
    data: data?.data,
    isLoading
  }
}
