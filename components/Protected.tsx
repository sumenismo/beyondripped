import { NavBar } from '@/components/NavBar'
import { Box } from '@mui/material'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'

export interface ProtectedProps {
  children: React.ReactNode
}

export default function Protected({ children }: ProtectedProps) {
  const { data } = useSession()
  const router = useRouter()

  const role = (data?.user as any)?.role

  switch (role) {
    case 'ADMIN':
      if (router.route.includes('dashboard')) {
        return (
          <Box>
            <NavBar />
            {children}
          </Box>
        )
      }
      return <Box>403</Box>

    case 'FINANCE':
      if (router.route.includes('finance')) {
        return (
          <Box>
            <NavBar />
            {children}
          </Box>
        )
      }
      return <Box>403</Box>

    case 'MEMBER':
      if (router.route.includes('member')) {
        return (
          <Box>
            <NavBar />
            {children}
          </Box>
        )
      }
      return <Box>403</Box>

    default:
      return <Box>403</Box>
  }
}

export async function getServerSideProps(ctx: any) {
  return {
    props: {
      session: await getSession(ctx)
    }
  }
}
