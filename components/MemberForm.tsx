import { ControlledInput } from '@/components/forms/ControlledInput'
import { PTextField } from '@/components/forms/PTextField'
import { Role } from '@/pages'
import { adminMemberFormValidationSchema } from '@/validation/adminMemberFormValidationSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Paper, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

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
}

export const MemberForm = ({
  role,
  showCodeInput = false,
  showIsSuccess = false,
  title = '',
  submitButtonLabel = 'Submit',
  successMessage = 'Success'
}: MemberFormProps) => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { control, handleSubmit, setError, clearErrors, reset } =
    useForm<MemberFormValues>({
      resolver: yupResolver(adminMemberFormValidationSchema),
      defaultValues: {
        email: '',
        name: '',
        referralCode: ''
      }
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
      if (res.status === 409) {
        setError('email', {
          message: 'Email already used'
        })
      }
      if (res.status === 201) {
        clearErrors()
        setIsSuccess(true)
        reset({ email: '', name: '', referralCode: '' })
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
        <Box pb={2}>
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
        <Box>
          <Typography align='center' variant='body1' color='success.main'>
            {successMessage}
          </Typography>
        </Box>
      ) : null}
    </Paper>
  )
}
