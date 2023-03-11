import { AppBar, Button } from '@mui/material'
import { signOut } from 'next-auth/react'

export const NavBar = () => {
  return (
    <AppBar>
      <Button color='inherit' onClick={() => signOut()}>
        Logout
      </Button>
    </AppBar>
  )
}
