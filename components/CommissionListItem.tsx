import { CodeButton } from '@/components/CodeButton'
import { SetAsPaidButton } from '@/components/SetAsPaidButton'
import { Referral } from '@/hooks/useGetCommisions'
import { Chip, TableCell, TableRow } from '@mui/material'

export interface CommissionListItemProps {
  com: Referral
}

export const CommissionListItem = ({ com }: CommissionListItemProps) => {
  const getActiveStatus = () => {
    if (com.member.activeDate?.start && com.member.activeDate?.end) {
      const today = new Date()
      return (
        today > new Date(com.member.activeDate?.start) &&
        today < new Date(com.member.activeDate?.end)
      )
    }
    return false
  }

  const getAmount = () => {
    return com.fees.monthlyFee * (com.fees.commissionPercent / 100)
  }

  const isActive = getActiveStatus()

  return (
    <TableRow>
      <TableCell>
        <CodeButton code={com.member.referralCode} />
      </TableCell>
      <TableCell>{com.member.name}</TableCell>
      <TableCell>{com.member.email}</TableCell>
      {/* <TableCell>
        <Chip
          label={isActive ? 'Active' : 'Inactive'}
          color={isActive ? 'success' : 'default'}
        />
      </TableCell> */}
      <TableCell>{com.referred.name}</TableCell>
      <TableCell>{getAmount()}</TableCell>
      <TableCell>
        <Chip
          label={com.isPaid ? 'Paid' : 'Unpaid'}
          color={com.isPaid ? 'success' : 'default'}
        />
      </TableCell>
      <TableCell width={140}>
        <SetAsPaidButton com={com} />
      </TableCell>
    </TableRow>
  )
}
