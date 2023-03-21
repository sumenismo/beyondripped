import Protected from '@/components/Protected'
import { useGetCommissions } from '@/hooks/useGetCommisions'

export default function FinanceHome() {
  const { data } = useGetCommissions()
  console.log({ commissions: data })
  return <Protected>Finance</Protected>
}
