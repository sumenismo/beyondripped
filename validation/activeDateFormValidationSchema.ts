import { ActiveDateFormValues } from '@/components/ActiveDateForm'
import * as yup from 'yup'

export const activeDateFormValidationSchema: yup.Schema<ActiveDateFormValues> =
  yup.object({
    service: yup.string().required('Required field'),
    start: yup.date().required('Required field'),
    end: yup.date().required('Required field')
  })
