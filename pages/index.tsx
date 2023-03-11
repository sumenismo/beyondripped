import { Box, Container, Typography } from '@mui/material'

export default function Home() {
  return (
    <Container maxWidth='lg'>
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography variant='h4' component='h1' gutterBottom>
          Welcome to Beyond Ripped
        </Typography>
      </Box>
    </Container>
  )
}
