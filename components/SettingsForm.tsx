import { ControlledInput } from '@/components/forms/ControlledInput'
import { PTextField } from '@/components/forms/PTextField'
import { useSettings } from '@/hooks/useSettings'
import { settingsFormValidationSchema } from '@/validation/settingsFormValidationSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, InputAdornment, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export interface SettingsFormValues {
  monthlyFee: number
  commissionPercent: number
}

export interface SettingsFormProps {
  defaultValues?: SettingsFormValues
}

export const SettingsForm = ({ defaultValues }: SettingsFormProps) => {
  const { mutate: saveSettings, isLoading } = useSettings()
  const [isSuccess, setIsSuccess] = useState(false)
  const { handleSubmit, control, formState, reset } =
    useForm<SettingsFormValues>({
      resolver: yupResolver(settingsFormValidationSchema),
      defaultValues,
      mode: 'onChange'
    })

  useEffect(() => {
    if (isSuccess) {
      const timeout = setTimeout(() => {
        setIsSuccess(false)
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [isSuccess])

  const onSubmit = (args: SettingsFormValues) => {
    setIsSuccess(false)
    saveSettings(args, {
      onSuccess: () => {
        reset({}, { keepValues: true })
        setIsSuccess(true)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ControlledInput
            name='monthlyFee'
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
            name='commissionPercent'
            placeholder='Commission Percent'
            control={control}
            component={PTextField}
            //@ts-ignore
            InputProps={{
              endAdornment: <InputAdornment position='end'>%</InputAdornment>
            }}
            fullWidth
            inputProps={{
              autoComplete: 'off'
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant='contained'
            disabled={!formState.isDirty || isLoading || !formState.isValid}
            type='submit'
          >
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </Grid>
        {isSuccess && (
          <Grid item xs={12}>
            <Typography variant='body1' color='success.main'>
              Settings saved!
            </Typography>
          </Grid>
        )}
      </Grid>
    </form>
  )
}
