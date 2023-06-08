import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export const useGetUserServices = (access: string | undefined = 'finance') => {
  const router = useRouter()
  const search = router.query.search
  const page = router.query.page ?? 1
  const perPage = router.query.perPage ?? 25
  const user = router.query.id

  const getUserServices = async () => {
    const url = `/api/${access}/userService?user=${user}${
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

  const { data, ...rest } = useQuery(`user-services-${user}`, getUserServices)

  return {
    userServices: data?.data.data,
    meta: data?.data.meta,
    ...rest
  }
}
