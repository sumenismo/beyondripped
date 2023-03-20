import { TextField } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers'
export interface PDatePickerProps {
  label: string
  value: string
  onChange: (value: any, keyboardInputValue?: string | undefined) => void
  min?: string
  name?: string
  disabled?: boolean
}

export const PDatePicker = ({
  value,
  onChange,
  label = 'Date',
  min,
  disabled = false
}: PDatePickerProps) => {
  return (
    <DesktopDatePicker
      label={label}
      // @ts-ignore
      inputFormat='MM/dd/yyyy'
      value={value}
      // @ts-ignore
      onChange={onChange}
      minDate={min}
      sx={{
        width: '100%'
      }}
      disabled={disabled}
      textField={(params: any) => (
        <TextField
          size='small'
          color='primary'
          error={false}
          fullWidth
          {...params}
        />
      )}
    />
  )
}
