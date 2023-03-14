import { MemberForm } from '@/components/MemberForm'
import Protected from '@/components/Protected'
import CloseIcon from '@mui/icons-material/Close'
import { Button, Dialog, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'

export default function Members() {
  const [openMemberForm, setOpenMemberForm] = useState(false)
  return (
    <Protected>
      <Typography>Members</Typography>
      <Button onClick={() => setOpenMemberForm(true)}>Add New Member</Button>
      <Dialog
        open={openMemberForm}
        onClose={() => setOpenMemberForm(false)}
        fullWidth
        maxWidth='sm'
      >
        <Box
          sx={{
            position: 'relative'
          }}
        >
          <IconButton
            sx={{ position: 'absolute', top: 10, right: 10 }}
            onClick={() => setOpenMemberForm(false)}
          >
            <CloseIcon />
          </IconButton>
          <MemberForm />
        </Box>
      </Dialog>
    </Protected>
  )
}
