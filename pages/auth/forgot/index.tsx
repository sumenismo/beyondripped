import { ForgotPasswordForm } from '@/components/ForgotPasswordForm'
import { Container, Grid, Paper, Typography } from '@mui/material'

export default function Forgot() {
  return (
    <Container maxWidth='sm'>
      <Paper elevation={0} sx={{ p: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography align='center' variant='h6'>
              Forgot Password
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ForgotPasswordForm />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
