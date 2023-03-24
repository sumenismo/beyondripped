import { ChangePasswordForm } from '@/components/ChangePasswordForm'
import Protected from '@/components/Protected'
import { SettingsForm } from '@/components/SettingsForm'
import { useGetSettings } from '@/hooks/useGetSettings'
import { Grid, Paper, Typography } from '@mui/material'

export default function Settings() {
  const { data, isLoading } = useGetSettings()

  return (
    <Protected>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant='h6'>App Settings</Typography>
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
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4 }}>
            <ChangePasswordForm />
          </Paper>
        </Grid>
      </Grid>
    </Protected>
  )
}
