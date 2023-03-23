import { Member } from '@/components/MemberList'
import { useQuery } from 'react-query'

export interface Referral {
  _id: string
  member: Member
  referred: Member
  date: Date
  isPaid?: boolean
}

export const useGetMemberCommissions = (id: string) => {
  const getCommissions = async () => {
    const url = `/api/finance/${id}`

    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    return res.json()
  }

  const { data, isLoading } = useQuery(`commissions-${id}`, getCommissions, {
    enabled: id !== undefined
  })

  return {
    data: data?.data,
    isLoading
  }
}
