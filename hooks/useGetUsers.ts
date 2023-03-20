import { Role } from '@/pages'
import { useQuery } from 'react-query'

export const useGetUsers = (role: Role) => {
  const getUsers = async () => {
    const url = `/api/admin/user?role=${role}`
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    return res.json()
  }

  const { data, isLoading } = useQuery(`users-${role}`, getUsers)

  return {
    isLoading,
    users: data?.data
  }
}
