import { GetServerSidePropsContext } from 'next'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export type Role = 'ADMIN' | 'MEMBER' | 'FINANCE'

export default function Home() {
  const { data } = useSession()
  const role = (data?.user as any)?.role
  const { push } = useRouter()

  useEffect(() => {
    switch (role) {
      case 'ADMIN':
        push('/admin/members')
        break
      case 'MEMBER':
        push('/member')
        break
      case 'FINANCE':
        push('/finance')
        break

      default:
        push('/auth/signin')
        break
    }
  }, [role])

  return <></>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      session: await getSession(context)
    }
  }
}
