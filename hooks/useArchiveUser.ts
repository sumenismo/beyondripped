import { Role } from '@/pages'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'

export const useArchiveUser = (role?: Role) => {
  const router = useRouter()
  const id = router.query.id
  const queryClient = useQueryClient()

  const archiveMember = async () => {
    const url = `/api/admin/user/${id}`
    const res = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        action: 'ARCHIVE'
      }),
      headers: { 'Content-Type': 'application/json' }
    })

    return res.json()
  }

  return useMutation(archiveMember, {
    onSuccess: () => {
      queryClient.invalidateQueries(`user-${id}`)
      queryClient.invalidateQueries(`user-${role}`)
    },
    onError: (error: any) => {
      console.log(error?.message)
    }
  })
}
