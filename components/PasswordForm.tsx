import { ControlledInput } from '@/components/forms/ControlledInput'
import { PTextField } from '@/components/forms/PTextField'
import Link from '@/components/Link'
import { passwordFormValidationSchema } from '@/validation/passwordFormValidation'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Container, Paper, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export interface PasswordFormvalues {
  password: string
  confirmPassword: string
}

export const PasswordForm = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { control, handleSubmit, setError } = useForm<PasswordFormvalues>({
    resolver: yupResolver(passwordFormValidationSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    },
    mode: 'onChange'
  })
  const { query } = useRouter()

  const onSubmit = async (args: PasswordFormvalues) => {
    try {
      setIsLoading(true)
      const url = '/api/userAuth/verify'
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ password: args.password, code: query.code }),
        headers: { 'Content-Type': 'application/json' }
      })

      const result = await res.json()

      if (res.status === 201) {
        setIsSuccess(true)
        return
      }

      setIsSuccess(false)
      setError('password', result.error ?? 'Something went wrong.')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (query.code === undefined) {
    return null
  }

  return (
    <Container maxWidth='sm'>
      <Paper elevation={0}>
        {isSuccess ? (
          <Typography>
            Password set! You can login <Link href='/auth/signin'>here</Link>.
          </Typography>
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
                  autoComplete: 'off'
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
                  autoComplete: 'off'
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
      </Paper>
    </Container>
  )
}
