import { useGetMemberCommissions } from '@/hooks/useGetMemberCommissions'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'

export const TotalMonthCommissions = () => {
  const router = useRouter()
  const { data, isLoading, total } = useGetMemberCommissions(
    router.query.code as string
  )

  if (router.query.code === undefined || total === undefined) {
    return null
  }
  return (
    <Typography
      variant='h6'
      lineHeight={2}
      align='right'
      color='success.main'
      sx={{ pr: 2 }}
    >
      Total: {total.toLocaleString('en-US')}
    </Typography>
  )
}
