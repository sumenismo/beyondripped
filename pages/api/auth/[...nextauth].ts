import NextAuth, { Account, Profile, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

export interface UserProfile {
  email: string
  password: string
  role: 'ADMIN' | 'FINANCE' | 'MEMBER'
}

export interface JWTCallbackOptions {
  token: JWT
  user?: UserProfile
  account?: Account | null
  profile?: Profile
  isNewUser?: boolean
}

export interface CustomSession extends Session {
  accessToken: any
  user: any
  data: any
}
export interface SessionCallbackOptions {
  session: CustomSession
  user: UserProfile
  token: JWT
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        username: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },

      async authorize(credentials, req) {
        let user = null
        const url = `${process.env.NEXTAUTH_URL}/api/user/auth`
        const res: any = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' }
        })

        if (res.status === 200) {
          user = await res.json()
        }

        if (user) {
          return user
        }

        return null
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin'
  },
  session: { jwt: true },
  callbacks: {
    async jwt(params: JWTCallbackOptions) {
      const { account, token, user } = params
      if (account?.accessToken) {
        token.accessToken = account.accessToken
      }
      if (user?.role) {
        token.role = user.role
      }
      return token
    },
    async session(params: SessionCallbackOptions) {
      const { session, token } = params

      if (token?.role) {
        session.user.role = token.role
      }
      return session
    }
  }
}
export default NextAuth(authOptions as any)
