import { SettingsFormValues } from '@/components/SettingsForm'
import * as yup from 'yup'

export const settingsFormValidationSchema: yup.Schema<SettingsFormValues> =
  yup.object({
    monthlyFee: yup
      .number()
      .required('Required field')
      .min(1, 'Cannot be less than 1')
      .typeError('Invalid number'),
    commissionPercent: yup
      .number()
      .required('Required field')
      .min(1, 'Cannot be less than 1')
      .typeError('Invalid number')
  })
