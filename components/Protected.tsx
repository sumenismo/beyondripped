import { NavBar } from '@/components/NavBar'
import { Box, Container } from '@mui/material'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'

export interface ProtectedProps {
  children: React.ReactNode
}

export default function Protected({ children }: ProtectedProps) {
  const { data } = useSession()
  const router = useRouter()

  const base = router.pathname.split('/')[1]
  const role = (data?.user as any)?.role

  switch (role) {
    case 'ADMIN':
      if (base.includes('admin')) {
        return (
          <Box width='100%' pt={3}>
            <NavBar role='ADMIN' />
            <Container>{children}</Container>
          </Box>
        )
      }
      return <Box>403</Box>

    case 'FINANCE':
      if (base.includes('finance')) {
        return (
          <Box width='100%' pt={3}>
            <NavBar role='FINANCE' />
            <Container>{children}</Container>
          </Box>
        )
      }
      return <Box>403</Box>

    case 'MEMBER':
      if (base.includes('member')) {
        return (
          <Box width='100%' pt={3}>
            <NavBar role='MEMBER' />
            <Container>{children}</Container>
          </Box>
        )
      }
      return <Box>403</Box>

    default:
      return <Box></Box>
  }
}

export async function getServerSideProps(ctx: any) {
  return {
    props: {
      session: await getSession(ctx)
    }
  }
}
