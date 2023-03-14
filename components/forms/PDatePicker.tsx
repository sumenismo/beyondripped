import { TextField } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers'
export interface PDatePickerProps {
  label: string
  value: string
  onChange: (value: any, keyboardInputValue?: string | undefined) => void
  min?: string
}

export const PDatePicker = ({
  value,
  onChange,
  label = 'Date',
  min
}: PDatePickerProps) => {
  return (
    <DesktopDatePicker
      label={label}
      inputFormat='MM/dd/yyyy'
      value={value}
      onChange={onChange}
      minDate={min}
      renderInput={(params: any) => (
        <TextField
          {...params}
          size='small'
          color='primary'
          error={false}
          fullWidth
        />
      )}
    />
  )
}
