import { Service, ServiceCard } from '@/components/ServiceCard'
import { Grid, Typography } from '@mui/material'

export interface ServicesListProps {
  services: Service[]
}

export const ServicesList = ({ services }: ServicesListProps) => {
  if (services === undefined) {
    return <Typography variant='body1'>No services found</Typography>
  }

  return (
    <Grid container spacing={2}>
      {services.map((service: Service) => (
        <Grid item xs={12} md={4} key={service._id}>
          <ServiceCard {...service} />
        </Grid>
      ))}
    </Grid>
  )
}
