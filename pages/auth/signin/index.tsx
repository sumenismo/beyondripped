import { Box, Button, TextField, Typography } from '@mui/material'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

export interface LoginFormValues {
  username: string
  password: string
}

export default function LoginForm() {
  const { data } = useSession()
  const router = useRouter()
  const callbackUrl = (router.query.callbackUrl as string) ?? '/dashboard'
  const error = router.query.error
  let isError = error !== undefined && error !== null

  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const onSubmit = async (args: LoginFormValues) => {
    try {
      await signIn('credentials', {
        ...args,
        callbackUrl: callbackUrl
      })
    } catch (error) {
      console.log(error)
      isError = true
    }
  }

  useEffect(() => {
    if (data) {
      router.push(callbackUrl)
    }
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box pb={2}>
        <Controller
          name='username'
          control={control}
          render={({ field }) => (
            <TextField size='small' placeholder='email' fullWidth {...field} />
          )}
        />
      </Box>
      <Box pb={2}>
        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <TextField
              size='small'
              placeholder='password'
              type='password'
              fullWidth
              {...field}
            />
          )}
        />
      </Box>
      {isError ? (
        <Box pb={2}>
          <Typography variant='body1' color='error'>
            Invalid username or password.
          </Typography>
        </Box>
      ) : null}
      <Box pb={2}>
        <Button size='small' variant='contained' fullWidth type='submit'>
          Login
        </Button>
      </Box>
    </form>
  )
}
