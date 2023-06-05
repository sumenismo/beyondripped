import { LabelledValue } from '@/components/LabelledValue'
import { ServiceForm } from '@/components/ServiceForm'
import { useDeleteService } from '@/hooks/useDeleteService'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  Grid,
  IconButton,
  Typography
} from '@mui/material'
import { useState } from 'react'

export interface Service {
  _id: string
  name: string
  fee: number
  commission: number
  isMultiple: boolean
  isActive?: boolean
}

export const ServiceCard = (service: Service) => {
  const [openServiceFrom, setOpenServiceForm] = useState(false)
  const [deleteDialog, setOpenDeleteDialog] = useState(false)
  const { mutate: deleteService, isLoading } = useDeleteService()

  const { name, fee, commission, isMultiple } = service

  const handleDelete = () => {
    deleteService(service, {
      onSuccess: () => {
        setOpenDeleteDialog(false)
      }
    })
  }

  return (
    <>
      <Card sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <LabelledValue value={name} label='Name' />
          </Grid>
          <Grid item xs={4} container alignContent='flex-end'>
            {isMultiple && (
              <Chip size='small' label='Multiple' color='success' />
            )}
          </Grid>
          <Grid item xs={6}>
            <LabelledValue value={`${fee}`} label='Fee' />
          </Grid>
          <Grid item xs={6}>
            <LabelledValue value={`${commission}`} label='Commission' />
          </Grid>
          <Grid
            item
            xs={12}
            container
            spacing={2}
            justifyContent='space-between'
          >
            <Grid item>
              <Button
                variant='outlined'
                onClick={() => setOpenServiceForm(true)}
              >
                Edit
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant='outlined'
                onClick={() => setOpenDeleteDialog(true)}
                color='error'
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Card>
      <Dialog
        open={deleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        fullWidth
        maxWidth='sm'
      >
        <Box p={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h6' sx={{ textTransform: 'capitalize' }}>
                Delete {service.name}?
              </Typography>
              <Typography variant='body1'>
                Are you sure you want to delete this service?
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              container
              spacing={2}
              justifyContent='space-between'
            >
              <Grid item>
                <Button
                  onClick={handleDelete}
                  variant='contained'
                  color='error'
                >
                  {isLoading ? 'Deleting' : 'Delete'}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='outlined'
                  onClick={() => setOpenDeleteDialog(false)}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
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
            }}
          >
            <CloseIcon />
          </IconButton>
          <ServiceForm
            successCallback={() => setOpenServiceForm(false)}
            defaultValues={service}
          />
        </Box>
      </Dialog>
    </>
  )
}
