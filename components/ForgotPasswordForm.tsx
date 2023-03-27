import { ControlledInput } from '@/components/forms/ControlledInput'
import { PTextField } from '@/components/forms/PTextField'
import { useForgotPassword } from '@/hooks/useForgotPassword'
import { forgotPasswordFormValidationSchema } from '@/validation/forgotPasswordFormValidationSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export const ForgotPasswordForm = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(forgotPasswordFormValidationSchema),
    defaultValues: {
      email: ''
    }
  })
  const [success, setSuccess] = useState(false)
  const { mutate: forgotPassword, isLoading } = useForgotPassword()

  const submitForm = (args: any) => {
    forgotPassword(args, {
      onSuccess: () => {
        setSuccess(true)
      }
    })
  }

  if (success) {
    return (
      <Typography variant='subtitle1'>
        An email was sent to you. Please follow the instructions to reset your
        password.
      </Typography>
    )
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ControlledInput
            name='email'
            placeholder='Email'
            control={control}
            component={PTextField}
            fullWidth
            inputProps={{
              autoComplete: 'off'
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' type='submit'>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
