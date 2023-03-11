import { NavBar } from '@/components/NavBar'
import { Box, Container } from '@mui/material'
import { useSession } from 'next-auth/react'
import React from 'react'

export interface PageContainerProps {
  children: React.ReactNode
}

export const PageContainer = ({ children }: PageContainerProps) => {
  const { data } = useSession()

  return (
    <Container maxWidth='lg'>
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4
        }}
      >
        {data !== null && <NavBar />}
        {children}
      </Box>
    </Container>
  )
}
