import { LabelledValue } from '@/components/LabelledValue'
import { Card, Chip, Grid } from '@mui/material'

export interface Service {
  _id: string
  name: string
  fee: number
  commission: number
  isMultiple: boolean
  isActive?: boolean
}

export const ServiceCard = ({ name, fee, commission, isMultiple }: Service) => {
  return (
    <Card sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <LabelledValue value={name} label='Name' />
        </Grid>
        <Grid item xs={4} container alignContent='flex-end'>
          {isMultiple && <Chip size='small' label='Multiple' color='success' />}
        </Grid>
        <Grid item xs={6}>
          <LabelledValue value={`${fee}`} label='Fee' />
        </Grid>
        <Grid item xs={6}>
          <LabelledValue value={`${commission}`} label='Commission' />
        </Grid>
      </Grid>
    </Card>
  )
}
