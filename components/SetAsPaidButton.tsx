import { Referral } from '@/hooks/useGetCommisions'
import { useSetAsPaid } from '@/hooks/useSetAsPaid'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Button,
  Dialog,
  Grid,
  IconButton,
  Paper,
  Typography
} from '@mui/material'
import { useState } from 'react'

export interface SetAsPaidButtonProps {
  com: Referral
}

export const SetAsPaidButton = ({ com }: SetAsPaidButtonProps) => {
  const { mutate: setAsPaid, isLoading } = useSetAsPaid()
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setAsPaid(com._id, {
      onSuccess: () => {
        setOpen(false)
      }
    })
  }

  if (com.isPaid) {
    return (
      <Button type='button' disabled>
        Set as Paid
      </Button>
    )
  }

  return (
    <>
      <Button
        type='button'
        disabled={com.isPaid || isLoading}
        onClick={() => setOpen(true)}
      >
        {isLoading ? 'Setting...' : 'Set as Paid'}
      </Button>
      <Dialog open={open} maxWidth='sm' fullWidth>
        <Box
          sx={{
            position: 'relative'
          }}
        >
          <IconButton
            sx={{ position: 'absolute', top: 10, right: 10 }}
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </IconButton>
          <Paper sx={{ p: 6 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography align='center' variant='h6'>
                  Set Commision as Paid
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography align='center' variant='subtitle1'>
                  Are you sure you want to set this commission as paid?
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                container
                spacing={2}
                justifyContent='flex-end'
              >
                <Grid item xs={12}></Grid>
                <Grid item>
                  <Button type='button' onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant='contained'
                    color='success'
                    type='button'
                    disabled={com.isPaid || isLoading}
                    onClick={handleClick}
                  >
                    {isLoading ? 'Setting...' : 'Set as Paid'}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Dialog>
    </>
  )
}
