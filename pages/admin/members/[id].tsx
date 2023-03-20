import { ActiveDateForm } from '@/components/ActiveDateForm'
import Protected from '@/components/Protected'
import { useGetUser } from '@/hooks/useGetUser'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Button,
  Chip,
  Dialog,
  Grid,
  IconButton,
  Paper,
  Typography
} from '@mui/material'
import { isFuture } from 'date-fns'
import { useState } from 'react'

export default function Member() {
  const [activateFormOpen, setActivateFormOpen] = useState(false)
  const { data, isLoading } = useGetUser()

  if (isLoading) {
    return <Typography>Loading...</Typography>
  }

  if (data === undefined) {
    return <Typography>User not found</Typography>
  }

  const isActive =
    data.activeDate !== undefined &&
    data.activeDate.start !== undefined &&
    isFuture(new Date(data.activeDate.end))

  return (
    <>
      <Protected>
        <Paper sx={{ p: 4 }} elevation={0}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box display='flex' justifyContent='flex-start'>
                <Chip
                  label={isActive ? 'Active' : 'Inactive'}
                  color={isActive ? 'success' : 'default'}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display='flex' justifyContent='flex-end'>
                <Button
                  variant='contained'
                  onClick={() => setActivateFormOpen(true)}
                  disabled={isActive}
                >
                  Activate
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h5'>{data.name ?? data.email}</Typography>
              {data.referrer && (
                <Typography variant='body1'>
                  Referrer:{' '}
                  <Typography component='span' variant='subtitle1'>
                    {data.referrer?.name ??
                      data.referrer?.email ??
                      data.referrer?.code}
                  </Typography>
                </Typography>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Protected>
      <Dialog
        open={activateFormOpen}
        onClose={() => setActivateFormOpen(false)}
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
              onClick={() => setActivateFormOpen(false)}
            >
              <CloseIcon />
            </IconButton>
            <ActiveDateForm onSuccess={() => setActivateFormOpen(false)} />
          </Paper>
        </Box>
      </Dialog>
    </>
  )
}
