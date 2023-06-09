import { CommissionListItem } from '@/components/CommissionListItem'
import { Referral } from '@/hooks/useGetCommisions'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'

export interface ReferralsListProps {
  commissions: Referral[]
}

export const ReferralsList = ({ commissions }: ReferralsListProps) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Referral</TableCell>
            <TableCell>Service</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {commissions.map(com => (
            <CommissionListItem key={com._id} com={com} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
