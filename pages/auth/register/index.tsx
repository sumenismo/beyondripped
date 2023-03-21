import { MemberForm } from '@/components/MemberForm'
import { Container } from '@mui/material'

export default function Register() {
  return (
    <Container maxWidth='sm'>
      <MemberForm
        role='MEMBER'
        showIsSuccess
        successMessage='Registered!'
        title='Member Registration'
        submitButtonLabel='Register'
        showCodeInput
        showLogin
      />
    </Container>
  )
}
