import { LabelledValue } from '@/components/LabelledValue'
import { ServiceForm } from '@/components/ServiceForm'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  Grid,
  IconButton
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
  const { name, fee, commission, isMultiple } = service

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
          <Grid item xs={12}>
            <Button variant='outlined' onClick={() => setOpenServiceForm(true)}>
              Edit
            </Button>
          </Grid>
        </Grid>
      </Card>
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
