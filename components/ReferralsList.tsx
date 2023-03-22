import { SetAsPaidButton } from '@/components/SetAsPaidButton'
import { Referral } from '@/hooks/useGetCommisions'
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { format } from 'date-fns'

export interface ReferralsListProps {
  commissions: Referral[]
}

export const ReferralsList = ({ commissions }: ReferralsListProps) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Referrer</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Referred</TableCell>
            <TableCell>Month</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {commissions.map(com => (
            <TableRow key={com._id}>
              <TableCell>{com.member.name}</TableCell>
              <TableCell>{com.member.referralCode}</TableCell>
              <TableCell>{com.referred.name}</TableCell>
              <TableCell>{format(new Date(com.date), 'MMMM / yyyy')}</TableCell>
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
