import { DatePicker } from '@mui/x-date-pickers'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const MonthFilter = () => {
  const router = useRouter()
  const handleChange = (date: Date | null) => {
    router.replace({
      query: { ...router.query, date: date?.toISOString() }
    })
  }

  useEffect(() => {
    if (!router.query.date) {
      handleChange(new Date())
    }
  }, [router.query.date])

  return (
    <DatePicker
      views={['month', 'year']}
      label='Month'
      onAccept={handleChange}
      value={
        router.query.date ? new Date(router.query.date as string) : new Date()
      }
      slotProps={{
        textField: {
          size: 'small'
        }
      }}
    />
  )
}
