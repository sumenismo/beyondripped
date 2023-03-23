import { FinanceFilter } from '@/components/FinanceFilters'
import Protected from '@/components/Protected'
import { ReferralsList } from '@/components/ReferralsList'
import { TotalMonthCommissions } from '@/components/TotalMonthCommisions'
import { useGetCommissions } from '@/hooks/useGetCommisions'
import { Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'

export default function FinanceHome() {
  const { data, isLoading } = useGetCommissions()
  const router = useRouter()

  return (
    <Protected>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h6'>Commissions</Typography>
        </Grid>
        <Grid item xs={12}>
          <FinanceFilter />
        </Grid>
        <Grid item xs={12}>
          {isLoading || router.query.date === undefined ? (
            <Typography>Loading...</Typography>
          ) : (
            <>
              {data === undefined || data.length < 1 ? (
                <Typography>No commisions found</Typography>
              ) : (
                <ReferralsList commissions={data} />
              )}
            </>
          )}
        </Grid>
        <Grid item xs={12}>
          <TotalMonthCommissions />
        </Grid>
      </Grid>
    </Protected>
  )
}
