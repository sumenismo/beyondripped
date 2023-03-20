import { ActiveDateFormValues } from '@/components/ActiveDateForm'
import * as yup from 'yup'

export const activeDateFormValidationSchema: yup.Schema<ActiveDateFormValues> =
  yup.object({
    start: yup.date().required('Required field'),
    months: yup
      .number()
      .required('Required field')
      .min(1, 'Cannot be less than 1')
      .typeError('Invalid number')
  })
