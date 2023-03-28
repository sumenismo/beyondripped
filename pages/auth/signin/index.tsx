import Link from '@/components/Link'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export interface LoginFormValues {
  username: string
  password: string
}

export default function LoginForm() {
  const { data } = useSession()
  const router = useRouter()

  const error = router.query.error
  let isError = error !== undefined && error !== null

  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const [isLoading, setIsLoading] = useState(false)
  const onSubmit = async (args: LoginFormValues) => {
    try {
      setIsLoading(true)
      await signIn('credentials', {
        ...args,
        callbackUrl: '/'
      })
    } catch (error) {
      console.log(error)
      isError = true
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (data) {
      router.push('/')
    }
  }, [])

  return (
    <Box display='flex' maxWidth={500} width='100%' justifyContent='center'>
      <Paper
        sx={{ width: '100%', padding: 4, border: '1px solid rgba(0,0,0,.2)' }}
        elevation={0}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box pb={2}>
            <Typography align='center' variant='h6'>
              Beyond Ripped
            </Typography>
          </Box>
          <Box pb={2}>
            <Controller
              name='username'
              control={control}
              render={({ field }) => (
                <TextField
                  size='small'
                  placeholder='email'
                  fullWidth
                  {...field}
                />
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

          <Box pb={1}>
            <Button
              size='small'
              variant='contained'
              fullWidth
              type='submit'
              disabled={isLoading}
            >
              Login
            </Button>
          </Box>
          <Box pb={2} pr={1} display='flex' justifyContent='space-between'>
            <Link href='/auth/register'>Register</Link>
            <Link href='/auth/forgot'>Forgot Password</Link>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}
