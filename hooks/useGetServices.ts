import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export const useGetServices = (access: string | undefined = 'admin') => {
  const router = useRouter()
  const search = router.query.search
  const page = router.query.page ?? 1
  const perPage = router.query.perPage ?? 25

  const getServices = async () => {
    const url = `/api/${access}/service?${
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

  const { data, ...rest } = useQuery('services', getServices)

  return {
    services: data?.data.data,
    meta: data?.data.meta,
    ...rest
  }
}
