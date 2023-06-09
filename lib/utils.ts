import { addMonths, isEqual } from 'date-fns'
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

export const getMonths = (start: Date, end: Date) => {
  if (isEqual(start, end)) {
    return [start]
  }

  const range: Date[] = []
  let currentMonth = start

  while (currentMonth < end) {
    range.push(currentMonth)
    currentMonth = addMonths(currentMonth, 1)
  }

  return range
}
