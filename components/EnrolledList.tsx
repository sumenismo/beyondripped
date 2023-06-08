import { LabelledValue } from '@/components/LabelledValue'
import { Member } from '@/components/MemberList'
import { Service } from '@/components/ServiceCard'
import { useGetUserServices } from '@/hooks/useGetUserServices'
import { Grid, Typography } from '@mui/material'
import { format } from 'date-fns'

export interface UserService {
  _id: string
  user: Member
  service: Service
  name: string
  activeDate: {
    start: Date
    end: Date
  }
  commission: number
  fee: number
}

export const EnrolledList = () => {
  const { userServices, isLoading } = useGetUserServices('finance')

  if (isLoading) {
    return <Typography variant='body1'>Loading...</Typography>
  }
  if (userServices === undefined || userServices.length < 1) {
    return <Typography variant='body1'>Not enrolled in any service</Typography>
  }

  return (
    <Grid container spacing={2}>
      {userServices.map((userService: UserService) => (
        <Grid key={userService._id} item xs={12} container spacing={2}>
          <Grid item xs={12} md={4}>
            <LabelledValue label='Service' value={userService.service.name} />
          </Grid>
          <Grid item xs={12} md={4}>
            <LabelledValue
              label='Start'
              value={format(
                new Date(userService.activeDate.start),
                'MM / dd / yyyy'
              )}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <LabelledValue
              label='End'
              value={format(
                new Date(userService.activeDate.end),
                'MM / dd / yyyy'
              )}
            />
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}
