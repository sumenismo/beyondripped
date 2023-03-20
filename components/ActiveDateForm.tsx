import { ControlledDatePicker } from '@/components/forms/ControlledDatePicker'
import { ControlledInput } from '@/components/forms/ControlledInput'
import { PTextField } from '@/components/forms/PTextField'
import { useActivateMember } from '@/hooks/useActivateMember'
import { activeDateFormValidationSchema } from '@/validation/activeDateFormValidationSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, TextField } from '@mui/material'
import { addMonths, format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export interface ActiveDateFormValues {
  start: Date
  months: number
}

export interface ActiveDateFormProps {
  onSuccess?: () => void
}

export const ActiveDateForm = ({ onSuccess }: ActiveDateFormProps) => {
  const { handleSubmit, control, watch, formState } =
    useForm<ActiveDateFormValues>({
      resolver: yupResolver(activeDateFormValidationSchema),
      defaultValues: {
        start: new Date(),
        months: 1
      },
      mode: 'onChange'
    })
  const startVal = watch('start')
  const monsthVal = watch('months')
  const [end, setEnd] = useState<string | undefined>()

  const { isLoading, mutate: activate } = useActivateMember()

  useEffect(() => {
    if (startVal && monsthVal && !isNaN(monsthVal)) {
      setEnd(format(addMonths(new Date(startVal), monsthVal), 'MM / dd / yyyy'))
      return
    }
    setEnd(undefined)
  }, [startVal, monsthVal])

  const onSubmit = async (args: ActiveDateFormValues) => {
    activate(args, {
      onSuccess: () => {
        onSuccess?.()
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <ControlledDatePicker
            control={control}
            name='start'
            label='Start Date'
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField
            value={end}
            label='End Date'
            disabled
            size='medium'
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <ControlledInput
            name='months'
            placeholder='Months'
            component={PTextField}
            control={control}
            fullWidth
            size='medium'
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant='contained'
            type='submit'
            disabled={!formState.isValid || isLoading}
          >
            Activate
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
