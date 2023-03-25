import { MonthFilter } from '@/components/MonthFilter'
import { SearchFilter } from '@/components/SearchFilter'
import { Grid } from '@mui/material'

export interface FinanceFilterProps {
  hideSearch?: boolean
}

export const FinanceFilter = ({ hideSearch = false }: FinanceFilterProps) => {
  return (
    <Grid container spacing={2}>
      {!hideSearch && (
        <Grid item xs={12} md={4}>
          <SearchFilter />
        </Grid>
      )}

      <Grid item xs={12} md={4}>
        <MonthFilter />
      </Grid>
    </Grid>
  )
}
