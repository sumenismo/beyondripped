import { Typography } from '@mui/material'

export interface FieldErrorProps {
  content?: string
}

export const FieldError = ({ content }: FieldErrorProps) => {
  return (
    <Typography fontSize={12} color='error' marginTop={0.5}>
      {content}
    </Typography>
  )
}
