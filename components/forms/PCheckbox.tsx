import { getFieldColor } from '@/lib/utils'
import { Checkbox, FormControlLabel, InputProps } from '@mui/material'

export interface PTextFieldsProps extends InputProps {
  field: any
  fieldState: any
  disabled: boolean
  placeholder?: string
}

export const PCheckbox = ({
  field,
  fieldState,
  disabled,
  placeholder,
  ...rest
}: PTextFieldsProps) => (
  <FormControlLabel
    control={<Checkbox />}
    size='small'
    label={placeholder ?? field.name}
    disabled={disabled}
    error={fieldState.error !== undefined}
    color={getFieldColor(fieldState)}
    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
    {...field}
    {...rest}
  />
)
