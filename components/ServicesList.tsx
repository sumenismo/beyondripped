import { Service, ServiceCard } from '@/components/ServiceCard'
import { useGetServices } from '@/hooks/useGetServices'
import { Grid, Typography } from '@mui/material'

export const ServicesList = () => {
  const { data, isLoading } = useGetServices()

  if (isLoading) {
    return <Typography variant='body1'>Loading...</Typography>
  }

  if (data === undefined) {
    return <Typography variant='body1'>No services found</Typography>
  }

  return (
    <Grid container spacing={2}>
      {data.data.map((service: Service) => (
        <Grid item xs={12} md={4} key={service._id}>
          <ServiceCard {...service} />
        </Grid>
      ))}
    </Grid>
  )
}
