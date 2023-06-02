import { ServiceFormArgs } from '@/pages/api/admin/service'
import * as yup from 'yup'

export const serviceFormValidationSchema: yup.Schema<ServiceFormArgs> =
  yup.object({
    name: yup.string().required('Required field'),
    isMultiple: yup.boolean(),
    fee: yup
      .number()
      .required('Required field')
      .min(0, 'Cannot be less than 0')
      .typeError('Invalid number'),
    commission: yup
      .number()
      .required('Required field')
      .min(0, 'Cannot be less than 0')
      .typeError('Invalid number')
  })
