import { Grid, Typography } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'

export interface LabelledValueProps {
  label: string
  value: string
  variant?: Variant
}

export const LabelledValue = ({
  label,
  value,
  variant = 'body1'
}: LabelledValueProps) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Typography variant='caption'>{label}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant={variant}>{value}</Typography>
      </Grid>
    </Grid>
  )
}
