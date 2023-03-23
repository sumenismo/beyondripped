import { Button } from '@mui/material'
import { useRouter } from 'next/router'

export interface CodeButtonProps {
  code: string
}

export const CodeButton = ({ code }: CodeButtonProps) => {
  const router = useRouter()
  const handleClick = () => {
    router.replace({
      query: { ...router.query, code: router.query.code === code ? '' : code }
    })
  }
  return (
    <Button onClick={handleClick} variant='outlined'>
      {code}
    </Button>
  )
}
