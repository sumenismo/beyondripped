import { MemberFormValues } from '@/components/MemberForm'
import * as yup from 'yup'

export const adminMemberFormValidationSchema: yup.Schema<MemberFormValues> =
  yup.object({
    email: yup.string().email('Invalid email').required('Required field')
  })
