import { Edit } from '@mui/icons-material'
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'

export interface Member {
  name: string
  email: string
  referralCode: string
  referrer?: Member
  activeDate?: {
    start: Date
    end: Date
  }
  verify: any
  _id: string
}

export interface MemberListProps {
  members?: Member[]
}

export const MemberList = ({ members }: MemberListProps) => {
  if (members === undefined || members.length < 1) {
    return <Typography variant='body1'>No data found</Typography>
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Referral Code</TableCell>
            <TableCell>Verified Status</TableCell>
            <TableCell>Referred By</TableCell>
            <TableCell>Start</TableCell>
            <TableCell>End</TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map(member => (
            <TableRow
              key={member._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {member.name}
              </TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>{member.referralCode}</TableCell>
              <TableCell>
                {member.verify?.verified ? 'Verified' : 'Unverified'}
              </TableCell>
              <TableCell>
                {member.referrer?.name ?? member.referrer?.email ?? '-'}
              </TableCell>
              <TableCell>
                {member.activeDate?.start &&
                  new Date(member.activeDate?.start)?.toLocaleDateString()}
              </TableCell>
              <TableCell>
                {member.activeDate?.end &&
                  new Date(member.activeDate?.end)?.toLocaleDateString()}
              </TableCell>
              <TableCell align='right'>
                <IconButton size='small' href={`/admin/members/${member._id}`}>
                  <Edit />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
