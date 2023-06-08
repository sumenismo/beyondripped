import { ActiveDateForm } from '@/components/ActiveDateForm'
import { EnrolledList } from '@/components/EnrolledList'
import { LabelledValue } from '@/components/LabelledValue'
import Protected from '@/components/Protected'
import { useGetUser } from '@/hooks/useGetUser'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Button,
  Dialog,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography
} from '@mui/material'
import { isFuture } from 'date-fns'
import { useState } from 'react'

export default function Member() {
  const [activateFormOpen, setActivateFormOpen] = useState(false)
  const { data, isLoading } = useGetUser('finance')

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
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <Box display='flex' justifyContent='flex-end'>
                <Button
                  variant='contained'
                  onClick={() => setActivateFormOpen(true)}
                  sx={{ ml: 2 }}
                >
                  Enroll
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <LabelledValue label='Name' value={data.name} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <LabelledValue label='Email' value={data.email} />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant='subtitle1' fontWeight='900'>
                    Services
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <EnrolledList services={data.services} />
                </Grid>
              </Grid>
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
            <ActiveDateForm
              onSuccess={() => setActivateFormOpen(false)}
              isActive={isActive}
              userData={data}
            />
          </Paper>
        </Box>
      </Dialog>
    </>
  )
}
