import { MonthFilter } from '@/components/MonthFilter'
import Protected from '@/components/Protected'
import { ReferralsList } from '@/components/ReferralsList'
import { useGetCommissions } from '@/hooks/useGetCommisions'
import { Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'

export default function FinanceHome() {
  const { data, isLoading } = useGetCommissions()
  const router = useRouter()

  return (
    <Protected>
      <Grid container spacing={2}>
        <Grid item xs={12} container spacing={2} justifyContent='space-between'>
          <Grid item>
            <Typography variant='h6'>Commissions</Typography>
          </Grid>
          <Grid item>
            <MonthFilter />
          </Grid>
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
      </Grid>
    </Protected>
  )
}
