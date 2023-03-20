import { useRouter } from 'next/router'

export default function ComponentName() {
  const router = useRouter()
  return <>{router.query.id}</>
}
