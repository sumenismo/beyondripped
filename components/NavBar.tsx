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
    <AppBar>
      <Container maxWidth='xl'>
        <Toolbar>
          <Box sx={{ flexGrow: 1, width: '100%', display: 'flex' }}>
            <Typography
              variant='body1'
              sx={{ color: '#FFF', mr: 2, fontWeight: 900 }}
            >
              Beyond Ripped
            </Typography>
            <Typography sx={{ color: '#FFF' }}>|</Typography>
            {role === 'ADMIN' && (
              <>
                <Link
                  sx={{ textDecoration: 'none', mr: 2, ml: 2 }}
                  color='#FFF'
                  href='/admin/members'
                >
                  Members
                </Link>
                <Link
                  sx={{ textDecoration: 'none', mr: 2 }}
                  color='#FFF'
                  href='/admin/finance'
                >
                  Finance
                </Link>
              </>
            )}
          </Box>
          <Button color='inherit' onClick={() => signOut()}>
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
