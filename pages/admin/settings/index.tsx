import { ChangePasswordForm } from '@/components/ChangePasswordForm'
import Protected from '@/components/Protected'
import { useGetSettings } from '@/hooks/useGetSettings'
import { Grid, Paper } from '@mui/material'

export default function Settings() {
  const { data, isLoading } = useGetSettings()

  return (
    <Protected>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4 }}>
            <ChangePasswordForm />
          </Paper>
        </Grid>
      </Grid>
    </Protected>
  )
}
