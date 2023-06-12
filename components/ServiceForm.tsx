import { ControlledInput } from '@/components/forms/ControlledInput'
import { PTextField } from '@/components/forms/PTextField'
import { useService } from '@/hooks/useService'
import { ServiceFormArgs } from '@/pages/api/admin/service'
import { serviceFormValidationSchema } from '@/validation/serviceFormValidateionSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, MenuItem, Paper } from '@mui/material'
import { useForm } from 'react-hook-form'

export interface ServiceFormProps {
  successCallback?: () => void
  defaultValues?: ServiceFormArgs
}

export const ServiceForm = ({
  successCallback,
  defaultValues
}: ServiceFormProps) => {
  const { mutate: createService, isLoading } = useService()

  const { handleSubmit, control, formState, reset } = useForm<ServiceFormArgs>({
    resolver: yupResolver(serviceFormValidationSchema),
    defaultValues: defaultValues ?? {
      name: '',
      fee: 0,
      commission: 0,
      serviceType: 'MONTHLY'
    },
    mode: 'onChange'
  })

  const onSubmit = (args: ServiceFormArgs) => {
    createService(args, {
      onSuccess: () => {
        reset({}, { keepValues: true })
        successCallback?.()
      }
    })
  }

  return (
    <Paper
      sx={{ width: '100%', padding: 4, border: '1px solid rgba(0,0,0,.2)' }}
      elevation={0}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <ControlledInput
              name='name'
              placeholder='Name'
              control={control}
              component={PTextField}
              fullWidth
              inputProps={{
                autoComplete: 'off'
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            {/* @ts-ignore */}
            <ControlledInput
              name='serviceType'
              placeholder='Type'
              control={control}
              component={PTextField}
              fullWidth
              inputProps={{
                autoComplete: 'off'
              }}
              //@ts-ignore
              select
            >
              <MenuItem value='MONTHLY'>Monthly</MenuItem>
              <MenuItem value='SESSION'>Per Session</MenuItem>
            </ControlledInput>
          </Grid>
          <Grid item xs={12} md={6}>
            <ControlledInput
              name='fee'
              placeholder='Fee'
              control={control}
              component={PTextField}
              fullWidth
              inputProps={{
                autoComplete: 'off'
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ControlledInput
              name='commission'
              placeholder='Percent Commission'
              control={control}
              component={PTextField}
              prefix='%'
              fullWidth
              inputProps={{
                autoComplete: 'off'
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant='contained'
              disabled={
                !formState.isDirty ||
                isLoading ||
                !formState.isValid ||
                !formState.touchedFields
              }
              type='submit'
            >
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}
