import Link from '@/components/Link'
import { Role } from '@/pages'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { signOut } from 'next-auth/react'

export interface NavBarProps {
  role: Role
}

export const NavBar = ({ role }: NavBarProps) => {
  return (
    <AppBar sx={{ backgroundColor: '#d4fc04' }}>
      <Container maxWidth='xl'>
        <Toolbar>
          <Box sx={{ flexGrow: 1, width: '100%', display: 'flex' }}>
            <Typography
              variant='body1'
              sx={{ color: '#0c1413', mr: 2, fontWeight: 900 }}
            >
              Beyond Ripped
            </Typography>
            <Typography sx={{ color: '#0c1413' }}>|</Typography>
            {role === 'ADMIN' && (
              <>
                <Link
                  sx={{ textDecoration: 'none', mr: 2, ml: 2 }}
                  color='#0c1413'
                  href='/admin/member'
                >
                  Members
                </Link>
                <Link
                  sx={{ textDecoration: 'none', mr: 2 }}
                  color='#0c1413'
                  href='/admin/finance'
                >
                  Finance
                </Link>
                <Link
                  sx={{ textDecoration: 'none', mr: 2 }}
                  color='#0c1413'
                  href='/admin/admin'
                >
                  Admin
                </Link>
                <Link
                  sx={{ textDecoration: 'none', mr: 2 }}
                  color='#0c1413'
                  href='/admin/settings'
                >
                  Settings
                </Link>
              </>
            )}
            {role === 'FINANCE' && (
              <>
                <Link
                  sx={{ textDecoration: 'none', mr: 2, ml: 2 }}
                  color='#0c1413'
                  href='/finance'
                >
                  Commissions
                </Link>
                <Link
                  sx={{ textDecoration: 'none', mr: 2, ml: 2 }}
                  color='#0c1413'
                  href='/finance/member'
                >
                  Members
                </Link>
                <Link
                  sx={{ textDecoration: 'none', mr: 2, ml: 2 }}
                  color='#0c1413'
                  href='/finance/settings'
                >
                  Settings
                </Link>
              </>
            )}
            {role === 'MEMBER' && (
              <>
                <Link
                  sx={{ textDecoration: 'none', mr: 2, ml: 2 }}
                  color='#0c1413'
                  href='/member'
                >
                  Profile
                </Link>
                <Link
                  sx={{ textDecoration: 'none', mr: 2, ml: 2 }}
                  color='#0c1413'
                  href='/member/referrals'
                >
                  Referrals
                </Link>
                <Link
                  sx={{ textDecoration: 'none', mr: 2, ml: 2 }}
                  color='#0c1413'
                  href='/member/settings'
                >
                  Settings
                </Link>
              </>
            )}
          </Box>
          <Button sx={{ color: '#0c1413' }} onClick={() => signOut()}>
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
