import { ControlledInput } from '@/components/forms/ControlledInput'
import { PTextField } from '@/components/forms/PTextField'
import { useChangePassword } from '@/hooks/useChangePassword'
import { passwordFormValidationSchema } from '@/validation/passwordFormValidation'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export interface ChangePasswordFormValues {
  password: string
  confirmPassword: string
}

export const ChangePasswordForm = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const { control, handleSubmit, setError } = useForm<ChangePasswordFormValues>(
    {
      resolver: yupResolver(passwordFormValidationSchema),
      defaultValues: {
        password: '',
        confirmPassword: ''
      },
      mode: 'onChange'
    }
  )
  const { mutate: changePassword, isLoading } = useChangePassword()

  const onSubmit = async (args: ChangePasswordFormValues) => {
    changePassword(args, {
      onSuccess: () => setIsSuccess(true)
    })
  }

  return (
    <Box>
      {isSuccess ? (
        <Typography>Password changed! Logging you out...</Typography>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box pb={2}>
            <Typography align='center' variant='h6'>
              Change Password
            </Typography>
          </Box>
          <Box pb={2}>
            <ControlledInput
              name='password'
              placeholder='Password'
              control={control}
              component={PTextField}
              fullWidth
              inputProps={{
                autoComplete: 'off',
                type: 'password'
              }}
            />
          </Box>
          <Box pb={2}>
            <ControlledInput
              name='confirmPassword'
              placeholder='Confirm Password'
              control={control}
              component={PTextField}
              fullWidth
              inputProps={{
                autoComplete: 'off',
                type: 'password'
              }}
            />
          </Box>
          <Box pb={2}>
            <Button
              size='small'
              variant='contained'
              fullWidth
              type='submit'
              disabled={isLoading}
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </Box>
  )
}
