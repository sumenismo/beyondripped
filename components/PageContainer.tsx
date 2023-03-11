import { Box, Container } from '@mui/material'
import { getSession } from 'next-auth/react'
import React from 'react'

export interface PageContainerProps {
  children: React.ReactNode
}

export const PageContainer = ({ children }: PageContainerProps) => {
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
        {children}
      </Box>
    </Container>
  )
}

export async function getServerSideProps(ctx: any) {
  return {
    props: {
      session: await getSession(ctx)
    }
  }
}
