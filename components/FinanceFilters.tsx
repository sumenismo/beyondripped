import { MonthFilter } from '@/components/MonthFilter'
import { SearchFilter } from '@/components/SearchFilter'
import { Grid } from '@mui/material'

export const FinanceFilter = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <SearchFilter />
      </Grid>
      <Grid item xs={12} md={4}>
        <MonthFilter />
      </Grid>
    </Grid>
  )
}
