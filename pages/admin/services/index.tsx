import Protected from '@/components/Protected'
import { ServiceForm } from '@/components/ServiceForm'
import { ServicesList } from '@/components/ServicesList'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Button,
  Dialog,
  Grid,
  IconButton,
  Typography
} from '@mui/material'
import { useState } from 'react'

export default function Services() {
  const [openServiceFrom, setOpenServiceForm] = useState(false)

  return (
    <>
      <Protected>
        <Grid container spacing={2}>
          <Grid
            container
            justifyContent='space-between'
            item
            xs={12}
            spacing={2}
          >
            <Grid item>
              <Typography variant='h6'>Services</Typography>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                onClick={() => setOpenServiceForm(true)}
              >
                Add New Service
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <ServicesList />
          </Grid>
        </Grid>
      </Protected>
      <Dialog
        open={openServiceFrom}
        onClose={() => setOpenServiceForm(false)}
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
            onClick={() => setOpenServiceForm(false)}
          >
            <CloseIcon />
          </IconButton>
          <ServiceForm successCallback={() => setOpenServiceForm(false)} />
        </Box>
      </Dialog>
    </>
  )
}
