import Protected from '@/components/Protected'
import { Typography } from '@mui/material'

export default function Dashboard() {
  return (
    <Protected>
      <Typography variant='h1'>Protected</Typography>
    </Protected>
  )
}
