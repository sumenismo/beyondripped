import { PDatePicker } from '@/components/forms/PDatePicker'
import { Control, Controller } from 'react-hook-form'

export interface ControlledDatePickerProps {
  label: string
  name: string
  min?: string
  disabled?: boolean
  control: Control<any, any>
}

export const ControlledDatePicker = ({
  label,
  name,
  min,
  disabled = false,
  control
}: ControlledDatePickerProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <PDatePicker
          value={value}
          onChange={onChange}
          label={label}
          min={min}
          disabled={disabled}
        />
      )}
    />
  )
}
