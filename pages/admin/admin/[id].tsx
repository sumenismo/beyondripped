import { LabelledValue } from '@/components/LabelledValue'
import Protected from '@/components/Protected'
import { useArchiveUser } from '@/hooks/useArchiveUser'
import { useGetUser } from '@/hooks/useGetUser'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  Grid,
  IconButton,
  Paper,
  Typography
} from '@mui/material'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export default function Admin() {
  const [archiveForm, setArchiveFormOpen] = useState(false)
  const { data, isLoading } = useGetUser()
  const { data: userData } = useSession()
  const { mutate: archive, isLoading: isArchiving } = useArchiveUser('ADMIN')

  const handleArchive = () => {
    archive(undefined, {
      onSuccess: () => {
        setArchiveFormOpen(false)
      }
    })
  }

  const isLoggedInUser = (userData as any)?.user?.email === data?.email

  if (isLoading) {
    return <Typography>Loading...</Typography>
  }

  if (data === undefined) {
    return <Typography>User not found</Typography>
  }

  return (
    <>
      <Protected>
        <Paper sx={{ p: 4 }} elevation={0}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <LabelledValue label='Name' value={data.name} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <LabelledValue label='Email' value={data.email} />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  container
                  justifyContent='flex-end'
                  alignItems='center'
                  spacing={2}
                >
                  <Grid item>
                    <Button
                      variant='outlined'
                      color='error'
                      onClick={() => setArchiveFormOpen(true)}
                      disabled={data.isArchived || isLoggedInUser}
                    >
                      {data.isArchived ? 'Archived' : 'Archive'}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Protected>
      <Dialog
        open={archiveForm}
        onClose={() => setArchiveFormOpen(false)}
        fullWidth
        maxWidth='sm'
      >
        <Box
          sx={{
            position: 'relative'
          }}
        >
          <Paper sx={{ p: 6 }}>
            <IconButton
              sx={{ position: 'absolute', top: 10, right: 10 }}
              onClick={() => setArchiveFormOpen(false)}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant='h6' align='center' sx={{ mb: 4 }}>
              Are you sure you want to archive this user?
            </Typography>
            <DialogActions>
              <Button
                onClick={() => setArchiveFormOpen(false)}
                disabled={isArchiving}
              >
                Cancel
              </Button>
              <Button
                variant='outlined'
                color='error'
                onClick={handleArchive}
                disabled={isArchiving}
              >
                Archive
              </Button>
            </DialogActions>
          </Paper>
        </Box>
      </Dialog>
    </>
  )
}
