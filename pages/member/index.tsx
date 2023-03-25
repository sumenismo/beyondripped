import { LabelledValue } from '@/components/LabelledValue'
import Protected from '@/components/Protected'
import { useGetProfile } from '@/hooks/useGetProfile'
import { Chip, Grid, Paper, Typography } from '@mui/material'
import { format, isFuture } from 'date-fns'

export default function MemberHome() {
  const { data, isLoading } = useGetProfile()
  console.log({ data })

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

  const isActive =
    data.activeDate !== undefined &&
    data.activeDate.start !== undefined &&
    isFuture(new Date(data.activeDate.end))

  return (
    <Protected>
      <Grid container spacing={2}>
        <Grid item xs={12} container spacing={2} justifyContent='space-between'>
          <Grid item>
            <Typography variant='h6'>{data.name}</Typography>
          </Grid>
          <Grid item>
            <Chip
              label={isActive ? 'Active' : 'Inactive'}
              color={isActive ? 'success' : 'default'}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <LabelledValue label='Email' value={data.email} />
              </Grid>
              <Grid item xs={12} md={4}>
                <LabelledValue label='Code' value={data.referralCode} />
              </Grid>
              <Grid item xs={12} md={4}>
                <LabelledValue
                  label='Active Until'
                  value={format(
                    new Date(data.activeDate?.end),
                    'MM / dd / yyyy'
                  )}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Protected>
  )
}
