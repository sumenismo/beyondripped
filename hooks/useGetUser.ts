import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export const useGetUser = (access: string) => {
  const router = useRouter()
  const id = router.query.id

  const getUserById = async () => {
    console.log({ access })
    const url = `/api/${access}/user/${id}`
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    return res.json()
  }

  const { data, isLoading } = useQuery(`user-${id}`, getUserById, {
    enabled: id !== undefined
  })

  return {
    data: data?.data,
    isLoading
  }
}
