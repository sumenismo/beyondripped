import { getFieldColor } from '@/lib/utils'
import { InputProps, TextField } from '@mui/material'

export interface PTextFieldsProps extends InputProps {
  field: any
  fieldState: any
  disabled: boolean
  placeholder?: string
}

export const PTextField = ({
  field,
  fieldState,
  disabled,
  placeholder,
  ...rest
}: PTextFieldsProps) => (
  <TextField
    size='small'
    label={placeholder ?? field.name}
    fullWidth
    disabled={disabled}
    error={fieldState.error !== undefined}
    color={getFieldColor(fieldState)}
    {...field}
    {...rest}
  />
)
