import { ControlledInput } from '@/components/forms/ControlledInput'
import { PTextField } from '@/components/forms/PTextField'
import Link from '@/components/Link'
import { Role } from '@/pages'
import { adminMemberFormValidationSchema } from '@/validation/adminMemberFormValidationSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Paper, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'

export interface MemberFormValues {
  email: string
  name: string
  referralCode?: string
}

export interface MemberFormProps {
  role: Role
  showCodeInput?: boolean
  showIsSuccess?: boolean
  title?: string
  submitButtonLabel?: string
  successMessage?: string
  showLogin?: boolean
  showLogo?: boolean
}

export const MemberForm = ({
  role,
  showCodeInput = false,
  showIsSuccess = false,
  title = '',
  submitButtonLabel = 'Submit',
  successMessage = 'Success',
  showLogin = false,
  showLogo = false
}: MemberFormProps) => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()

  const router = useRouter()
  const search = router.query.search
  const page = router.query.page ?? 1
  const perPage = router.query.perPage ?? 25

  const { control, handleSubmit, setError, clearErrors, reset } =
    useForm<MemberFormValues>({
      resolver: yupResolver(adminMemberFormValidationSchema),
      defaultValues: {
        email: '',
        name: '',
        referralCode: ''
      },
      mode: 'onBlur'
    })

  const onSubmit = async (args: MemberFormValues) => {
    try {
      setIsLoading(true)
      const url = `/api/admin/user`
      const res: any = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ ...args, role, code: args.referralCode }),
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await res.json()
      if (res.status === 400 && data.error === 'Invalid referral code') {
        setError('referralCode', {
          message: 'Invalid referral code'
        })
      }
      if (res.status === 409) {
        setError('email', {
          message: 'Email already used'
        })
      }
      if (res.status === 201) {
        clearErrors()
        setIsSuccess(true)
        reset({ email: '', name: '', referralCode: '' })
        queryClient.invalidateQueries(
          `users-${role}-${search}-${page}-${perPage}`
        )
      }
    } catch (error: any) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Paper
      sx={{ width: '100%', padding: 4, border: '1px solid rgba(0,0,0,.2)' }}
      elevation={0}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {showLogo && (
          <Box pb={2} width='100%' height={120} sx={{ position: 'relative' }}>
            <Image
              src='/BeyondRippedLogo.png'
              alt='Beyond Ripped'
              fill
              style={{
                objectFit: 'contain'
              }}
            />
          </Box>
        )}
        <Box pb={2}>
          <Typography align='center' variant='h6' textTransform='capitalize'>
            {title}
          </Typography>
        </Box>
        <Box pb={2}>
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
        </Box>
        <Box pb={2}>
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
        </Box>
        {showCodeInput && (
          <Box pb={2}>
            <ControlledInput
              name='referralCode'
              placeholder='Referral Code'
              control={control}
              component={PTextField}
              fullWidth
              inputProps={{
                autoComplete: 'off'
              }}
            />
          </Box>
        )}
        <Box pb={0}>
          <Button
            disabled={isLoading}
            size='small'
            variant='contained'
            fullWidth
            type='submit'
          >
            {submitButtonLabel}
          </Button>
        </Box>
      </form>
      {showIsSuccess && isSuccess ? (
        <Box pt={2}>
          <Typography align='center' variant='body1' color='success.main'>
            {successMessage}
          </Typography>
        </Box>
      ) : null}
      {showLogin && (
        <Box pt={1} pr={1} display='flex' justifyContent='flex-end'>
          <Link href='/auth/signin'>Login</Link>
        </Box>
      )}
    </Paper>
  )
}
