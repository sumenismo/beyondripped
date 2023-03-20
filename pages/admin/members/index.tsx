import { MemberForm } from '@/components/MemberForm'
import { MemberList } from '@/components/MemberList'
import Protected from '@/components/Protected'
import { useGetUsers } from '@/hooks/useGetUsers'
import CloseIcon from '@mui/icons-material/Close'
import { Button, Dialog, Grid, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'

export default function Members() {
  const [openMemberForm, setOpenMemberForm] = useState(false)

  const { users, loading } = useGetUsers('MEMBER')

  return (
    <Protected>
      <Grid container spacing={2}>
        <Grid container justifyContent='space-between' item xs={12} spacing={2}>
          <Grid item>
            <Typography variant='h6'>Members</Typography>
          </Grid>
          <Grid item>
            <Button variant='contained' onClick={() => setOpenMemberForm(true)}>
              Add New Member
            </Button>
          </Grid>
          <Grid item xs={12}>
            {loading ? (
              <Typography>Loading...</Typography>
            ) : (
              <MemberList members={users} />
            )}
          </Grid>
        </Grid>
      </Grid>

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
          <MemberForm
            role='MEMBER'
            showIsSuccess
            title='Add New Member'
            submitButtonLabel='Add New Member'
          />
        </Box>
      </Dialog>
    </Protected>
  )
}
