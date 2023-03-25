import { FinanceFilter } from '@/components/FinanceFilters'
import { MemberReferralList } from '@/components/MemberReferralList'
import Protected from '@/components/Protected'
import { useGetReferrals } from '@/hooks/useGetReferrals'
import { Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'

export default function Referrals() {
  const { data, total, isLoading } = useGetReferrals()
  const router = useRouter()

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

  return (
    <Protected>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h6'>Referrals</Typography>
        </Grid>
        <Grid item xs={12}>
          <FinanceFilter hideSearch />
        </Grid>
        <Grid item xs={12}>
          {isLoading || router.query.date === undefined ? (
            <Typography>Loading...</Typography>
          ) : (
            <>
              {data === undefined || data.length < 1 ? (
                <Typography>No referrals found</Typography>
              ) : (
                <MemberReferralList referrals={data} />
              )}
            </>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant='h6'
            lineHeight={2}
            align='right'
            color='success.main'
            sx={{ pr: 2 }}
          >
            Total: {total?.toLocaleString('en-US')}
          </Typography>
        </Grid>
      </Grid>
    </Protected>
  )
}
