import Protected from '@/components/Protected'
import { Typography } from '@mui/material'

export default function Dashboard() {
  return (
    <Protected>
      <Typography variant='h6'>
        Welcome to Beyond Ripped Admin Dashboard
      </Typography>
    </Protected>
  )
}
