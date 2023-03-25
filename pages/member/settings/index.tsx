import { ChangePasswordForm } from '@/components/ChangePasswordForm'
import Protected from '@/components/Protected'
import { Grid, Paper, Typography } from '@mui/material'

export default function MemberSettings() {
  return (
    <Protected>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h6'>Settings</Typography>
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
