import { Role } from '@/pages'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export const useGetUsers = (role: Role) => {
  const router = useRouter()
  const search = router.query.search
  const getUsers = async () => {
    const url = `/api/admin/user?role=${role}${
      (search && `&search=${search}`) ?? ''
    }`
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    return res.json()
  }

  const { data, isLoading } = useQuery(`users-${role}-${search}`, getUsers)

  return {
    isLoading,
    users: data?.data.user
  }
}
