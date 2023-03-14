import { FieldError } from '@components/forms/FieldError'
import { InputProps } from '@mui/material'
import React, { ComponentClass, FunctionComponent } from 'react'
import { Control, Controller } from 'react-hook-form'

export interface ControlledInputProps extends InputProps {
  name: string
  component: string | FunctionComponent<any> | ComponentClass<any, any>
  control: Control<any, any>
  disabled?: boolean
  placeholder?: string
}

export const ControlledInput = ({
  component,
  name,
  control,
  disabled = false,
  placeholder,
  ...rest
}: ControlledInputProps) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            {React.createElement(component, {
              field,
              fieldState,
              disabled,
              placeholder,
              ...rest
            })}
            {fieldState.error !== undefined && (
              <FieldError content={fieldState.error.message} />
            )}
          </>
        )}
      />
    </>
  )
}
