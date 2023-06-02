import { ControlledInput } from '@/components/forms/ControlledInput'
import { PCheckbox } from '@/components/forms/PCheckbox'
import { PTextField } from '@/components/forms/PTextField'
import { useService } from '@/hooks/useService'
import { ServiceFormArgs } from '@/pages/api/admin/service'
import { serviceFormValidationSchema } from '@/validation/serviceFormValidateionSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, Paper } from '@mui/material'
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
      isMultiple: false
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
            <ControlledInput
              name='isMultiple'
              placeholder='Multiple'
              control={control}
              component={PCheckbox}
              fullWidth
              inputProps={{
                autoComplete: 'off'
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ControlledInput
              name='fee'
              placeholder='Monthly Fee'
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
              placeholder='Commission Percent'
              control={control}
              component={PTextField}
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
