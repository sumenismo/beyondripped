import Protected from '@/components/Protected'
import { UserProfile } from '@/components/UserProfile'
import { useGetProfile } from '@/hooks/useGetProfile'
import { Typography } from '@mui/material'

export default function MemberHome() {
  const { data, isLoading } = useGetProfile()

  if (isLoading) {
    return (
      <Protected>
        <Typography variant='body1'>Loading...</Typography>
      </Protected>
    )
  }

  if (data === undefined) {
    return (
      <Protected>
        <Typography>User data not found</Typography>
      </Protected>
    )
  }

  return <UserProfile data={data} />
}
