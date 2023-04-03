import { ActiveDateForm } from '@/components/ActiveDateForm'
import { LabelledValue } from '@/components/LabelledValue'
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
import { format, isFuture } from 'date-fns'
import { useState } from 'react'

export default function Member() {
  const [activateFormOpen, setActivateFormOpen] = useState(false)
  const { data, isLoading } = useGetUser('admin')

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
                >
                  {isActive ? 'Extend' : 'Activate'}
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
                {data.role === 'MEMBER' && (
                  <>
                    <Grid item xs={12} md={4}>
                      <LabelledValue label='Code' value={data.referralCode} />
                    </Grid>
                    {data.activeDate && (
                      <Grid item xs={12} md={4}>
                        <LabelledValue
                          label='Active Until'
                          value={format(
                            new Date(data.activeDate?.end as any),
                            'MM / dd / yyyy'
                          )}
                        />
                      </Grid>
                    )}
                  </>
                )}
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
