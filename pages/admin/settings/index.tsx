import Protected from '@/components/Protected'
import { SettingsForm } from '@/components/SettingsForm'
import { useGetSettings } from '@/hooks/useGetSettings'
import { Grid, Paper, Typography } from '@mui/material'

export default function Settings() {
  const { data, isLoading } = useGetSettings()

  return (
    <Protected>
      <Paper sx={{ p: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h6'>Settings</Typography>
          </Grid>
          <Grid item xs={12}>
            {isLoading ? (
              <Typography variant='body1'>Loading...</Typography>
            ) : (
              <SettingsForm defaultValues={data} />
            )}
          </Grid>
        </Grid>
      </Paper>
    </Protected>
  )
}
