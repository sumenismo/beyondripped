import { MemberForm } from '@/components/MemberForm'
import { MemberList } from '@/components/MemberList'
import Protected from '@/components/Protected'
import { useGetUsers } from '@/hooks/useGetUsers'
import CloseIcon from '@mui/icons-material/Close'
import { Button, Dialog, Grid, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'

export default function Finance() {
  const [openMemberForm, setOpenMemberForm] = useState(false)
  const { users, isLoading } = useGetUsers('FINANCE')

  return (
    <Protected>
      <Grid container spacing={2}>
        <Grid container justifyContent='space-between' item xs={12} spacing={2}>
          <Grid item>
            <Typography variant='h6'>Finance</Typography>
          </Grid>
          <Grid item>
            <Button variant='contained' onClick={() => setOpenMemberForm(true)}>
              Add New Finance
            </Button>
          </Grid>
          <Grid item xs={12}>
            {isLoading ? (
              <Typography>Loading...</Typography>
            ) : (
              <MemberList members={users} role='FINANCE' />
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
            role='FINANCE'
            showIsSuccess
            title='Add New Finance'
            submitButtonLabel='Add New Finance'
          />
        </Box>
      </Dialog>
    </Protected>
  )
}
