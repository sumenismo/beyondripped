import { BRPagination } from '@/components/BRPagination'
import Protected from '@/components/Protected'
import { ServiceForm } from '@/components/ServiceForm'
import { ServicesList } from '@/components/ServicesList'
import { useGetServices } from '@/hooks/useGetServices'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Button,
  Dialog,
  Grid,
  IconButton,
  Typography
} from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Services() {
  const [openServiceFrom, setOpenServiceForm] = useState(false)
  const { services, meta, isLoading } = useGetServices()
  const router = useRouter()

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
            {isLoading ? (
              <Typography variant='body1'>Loading...</Typography>
            ) : (
              <ServicesList services={services} />
            )}
          </Grid>
          <Grid item xs={12}>
            {meta && meta.count ? (
              <BRPagination count={meta.count} dataPerPage={meta.perPage} />
            ) : null}
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
            onClick={() => {
              setOpenServiceForm(false)
              router.replace({
                query: {
                  ...router.query,
                  id: undefined
                }
              })
            }}
          >
            <CloseIcon />
          </IconButton>
          <ServiceForm successCallback={() => setOpenServiceForm(false)} />
        </Box>
      </Dialog>
    </>
  )
}
