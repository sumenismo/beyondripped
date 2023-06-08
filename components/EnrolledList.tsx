import { LabelledValue } from '@/components/LabelledValue'
import { Service } from '@/components/ServiceCard'
import { Grid, Typography } from '@mui/material'
import { format } from 'date-fns'

export interface MemberService {
  _id: string
  serviceId: Service
  name: string
  activeDate: {
    start: Date
    end: Date
  }
  commission: number
  fee: number
}

export interface EnrolledListProps {
  services?: MemberService[]
}

export const EnrolledList = ({ services }: EnrolledListProps) => {
  if (services === undefined || services.length < 1) {
    return <Typography variant='body1'>Not enrolled in any service</Typography>
  }

  return (
    <Grid container spacing={2}>
      {services.map(service => (
        <Grid key={service._id} item xs={12} container spacing={2}>
          <Grid item xs={12} md={4}>
            <LabelledValue label='Service' value={service.serviceId.name} />
          </Grid>
          <Grid item xs={12} md={4}>
            <LabelledValue
              label='Start'
              value={format(
                new Date(service.activeDate.start),
                'MM / dd / yyyy'
              )}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <LabelledValue
              label='Service'
              value={format(new Date(service.activeDate.end), 'MM / dd / yyyy')}
            />
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}
