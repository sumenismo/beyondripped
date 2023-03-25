import { Member } from '@/components/MemberList'
import { Referral } from '@/hooks/useGetCommisions'
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'

export interface MemberReferralListProps {
  referrals?: Referral[]
}

export const MemberReferralList = ({ referrals }: MemberReferralListProps) => {
  const getActiveStatus = (user: Member) => {
    if (user.activeDate?.start && user.activeDate?.end) {
      const today = new Date()
      return (
        today > new Date(user.activeDate?.start) &&
        today < new Date(user.activeDate?.end)
      )
    }
    return false
  }

  const getAmount = (referral: Referral) => {
    return referral.fees.monthlyFee * (referral.fees.commissionPercent / 100)
  }

  if (referrals === undefined || referrals.length < 1) {
    return <Typography variant='body1'>No data found</Typography>
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Membership Status</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {referrals.map(com => (
            <TableRow key={com._id}>
              <TableCell>{com.referred.name}</TableCell>
              <TableCell>
                <Chip
                  label={getActiveStatus(com.referred) ? 'Active' : 'Inactive'}
                  color={getActiveStatus(com.referred) ? 'success' : 'default'}
                />
              </TableCell>
              <TableCell>{getAmount(com)}</TableCell>
              <TableCell>
                <Chip
                  label={com.isPaid ? 'Paid' : 'Unpaid'}
                  color={com.isPaid ? 'success' : 'default'}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
