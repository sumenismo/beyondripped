import { Grid, MenuItem, Pagination, TextField } from '@mui/material'
import { useRouter } from 'next/router'

export interface BRPaginationProps {
  count: number
  dataPerPage: number
}

export const BRPagination = ({ count, dataPerPage }: BRPaginationProps) => {
  const router = useRouter()
  const handleChange = (_: any, page: number) => {
    router.replace({
      query: { ...router.query, page }
    })
  }

  const hanglePerPageChange = (e: any) => {
    router.replace({
      query: { ...router.query, perPage: e.target.value, page: 1 }
    })
  }

  return (
    <Grid container spacing={2} justifyContent='flex-end'>
      <Grid item>
        <Pagination
          variant='outlined'
          shape='rounded'
          count={Math.ceil(count / dataPerPage)}
          page={Number((router.query.page as any) ?? 1)}
          onChange={handleChange}
          boundaryCount={2}
          color='primary'
        />
      </Grid>
      <Grid item>
        <TextField
          select
          onChange={hanglePerPageChange}
          size='small'
          defaultValue={25}
          value={(router.query.perPage as any) ?? 25}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </TextField>
      </Grid>
    </Grid>
  )
}
