import { PasswordFormvalues } from '@/components/PasswordForm'
import * as yup from 'yup'
import YupPassword from 'yup-password'

YupPassword(yup)

export const passwordFormValidationSchema: yup.Schema<PasswordFormvalues> =
  yup.object({
    password: yup.string().password().required('Required field'),
    confirmPassword: yup
      .string()
      .test('password-should-match', 'Passwords must match', function (value) {
        return this.parent.password === value
      })
      .required('Required field')
  })
