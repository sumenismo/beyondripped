import { ControllerFieldState } from 'react-hook-form'

export const getFieldColor = (fieldState: ControllerFieldState) => {
  if (fieldState.error) {
    return 'error'
  }

  if (fieldState.isDirty) {
    return 'success'
  }

  return undefined
}

export const addDays = (date: Date, days: number) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}
