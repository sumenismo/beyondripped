import { ControlledDatePicker } from '@/components/forms/ControlledDatePicker'
import { ControlledInput } from '@/components/forms/ControlledInput'
import { PTextField } from '@/components/forms/PTextField'
import { Member } from '@/components/MemberList'
import { Service } from '@/components/ServiceCard'
import { useActivateMember } from '@/hooks/useActivateMember'
import { useGetServices } from '@/hooks/useGetServices'
import { activeDateFormValidationSchema } from '@/validation/activeDateFormValidationSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, MenuItem, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export interface ActiveDateFormValues {
  service: string
  start: Date
  end: Date
}

export interface ActiveDateFormProps {
  userData: Member
  onSuccess?: () => void
  onError?: () => void
  isActive: boolean
}

export const ActiveDateForm = ({ onSuccess }: ActiveDateFormProps) => {
  const { handleSubmit, control, watch, formState, setValue, setError } =
    useForm<ActiveDateFormValues>({
      resolver: yupResolver(activeDateFormValidationSchema),
      defaultValues: {
        start: new Date(),
        end: new Date()
      },
      mode: 'onChange'
    })
  const startVal = watch('start')
  const end = watch('end')
  const { isLoading, mutate: activate } = useActivateMember()
  const { services, isLoading: loadingServices } = useGetServices('finance')

  useEffect(() => {
    if (new Date(startVal) >= new Date(end)) {
      setValue('end', new Date(startVal))
      return
    }
  }, [startVal])

  const onSubmit = async (args: ActiveDateFormValues) => {
    activate(args, {
      onSuccess: () => {
        onSuccess?.()
      },
      onError: error => {
        setError('service', { message: error?.message })
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h6'>Enroll to a Service</Typography>
        </Grid>
        <Grid item xs={12}>
          {loadingServices ? (
            <Typography variant='body1'>Loading...</Typography>
          ) : (
            // @ts-ignore
            <ControlledInput
              name='service'
              placeholder='Service'
              control={control}
              component={PTextField}
              fullWidth
              inputProps={{
                autoComplete: 'off',
                type: 'password'
              }}
              //@ts-ignore
              select
            >
              {services.map((service: Service) => (
                <MenuItem key={service._id} value={service._id}>
                  {service.name}
                </MenuItem>
              ))}
            </ControlledInput>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <ControlledDatePicker
            control={control}
            name='start'
            label='Start Date'
            //@ts-ignore
            min={new Date()}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ControlledDatePicker
            control={control}
            name='end'
            label='End Date'
            //@ts-ignore
            min={new Date(startVal)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant='contained'
            type='submit'
            disabled={!formState.isValid || isLoading}
          >
            Enroll
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
