import { LabelledValue } from '@/components/LabelledValue'
import Protected from '@/components/Protected'
import { useGetUser } from '@/hooks/useGetUser'
import { Box, Chip, Grid, Paper, Typography } from '@mui/material'
import { format, isFuture } from 'date-fns'
import { useState } from 'react'

export default function Member() {
  const [activateFormOpen, setActivateFormOpen] = useState(false)
  const { data, isLoading } = useGetUser('admin')

  if (isLoading) {
    return <Typography>Loading...</Typography>
  }

  if (data === undefined) {
    return <Typography>User not found</Typography>
  }

  const isActive =
    data.activeDate !== undefined &&
    data.activeDate.start !== undefined &&
    isFuture(new Date(data.activeDate.end))

  return (
    <>
      <Protected>
        <Paper sx={{ p: 4 }} elevation={0}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box display='flex' justifyContent='flex-start'>
                <Chip
                  label={isActive ? 'Active' : 'Inactive'}
                  color={isActive ? 'success' : 'default'}
                />
              </Box>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <LabelledValue label='Name' value={data.name} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <LabelledValue label='Email' value={data.email} />
                </Grid>
                {data.role === 'MEMBER' && (
                  <>
                    <Grid item xs={12} md={4}>
                      <LabelledValue label='Code' value={data.referralCode} />
                    </Grid>
                    {data.activeDate && (
                      <Grid item xs={12} md={4}>
                        <LabelledValue
                          label='Active Until'
                          value={format(
                            new Date(data.activeDate?.end as any),
                            'MM / dd / yyyy'
                          )}
                        />
                      </Grid>
                    )}
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Protected>
    </>
  )
}
