import { Role } from '@/pages'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export const useGetUsers = (
  role: Role,
  access: string | undefined = 'admin'
) => {
  const router = useRouter()
  const search = router.query.search
  const page = router.query.page ?? 1
  const perPage = router.query.perPage ?? 25

  const getUsers = async () => {
    const url = `/api/${access}/user?role=${role}${
      (search && `&search=${search}`) ?? ''
    }${(page && `&page=${page}`) ?? ''}${
      (perPage && `&perPage=${perPage}`) ?? ''
    }`
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    return res.json()
  }

  const { data, isLoading } = useQuery(
    `users-${role}-${search}-${page}-${perPage}`,
    getUsers
  )

  return {
    isLoading,
    users: data?.data.user,
    meta: data?.data.meta
  }
}
