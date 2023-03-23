import { MemberFormValues } from '@/components/MemberForm'
import * as yup from 'yup'

export const adminMemberFormValidationSchema: yup.Schema<MemberFormValues> =
  yup.object({
    email: yup
      .string()
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Invalid email'
      )
      .required('Required field'),
    name: yup.string().required('Required field'),
    referralCode: yup.string()
  })
