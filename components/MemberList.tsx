import { Role } from '@/pages'
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
  role?: Role
  members?: Member[]
  access?: string
}

export const MemberList = ({
  members,
  role = 'MEMBER',
  access = 'admin'
}: MemberListProps) => {
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
            {role === 'MEMBER' && (
              <>
                <TableCell>Referral Code</TableCell>
                <TableCell>Referred By</TableCell>
              </>
            )}
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
              {role === 'MEMBER' && (
                <>
                  <TableCell>{member.referralCode}</TableCell>
                  <TableCell>
                    {member.referrer?.name ?? member.referrer?.email ?? '-'}
                  </TableCell>
                </>
              )}

              <TableCell align='right'>
                {access === 'finance' && (
                  <IconButton
                    size='small'
                    href={`/${access}/${role.toLocaleLowerCase()}/${
                      member._id
                    }`}
                  >
                    <Edit />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
