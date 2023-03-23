import { TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const SearchFilter = () => {
  const router = useRouter()
  const search = router.query.search
  const [value, setValue] = useState(search)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    router.replace({
      query: { ...router.query, search: value }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        size='small'
        name='search'
        value={value}
        onChange={e => setValue(e.target.value)}
        fullWidth
        label='Search'
      />
    </form>
  )
}
