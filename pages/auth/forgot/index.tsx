import { ForgotPasswordForm } from '@/components/ForgotPasswordForm'
import { Box, Container, Grid, Paper, Typography } from '@mui/material'
import Image from 'next/image'

export default function Forgot() {
  return (
    <Container maxWidth='sm'>
      <Paper elevation={0} sx={{ p: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box pb={2} width='100%' height={120} sx={{ position: 'relative' }}>
              <Image
                src='/BeyondRippedLogo.png'
                alt='Beyond Ripped'
                fill
                style={{
                  objectFit: 'contain'
                }}
              />
            </Box>
          </Grid>
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
